/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import https from 'https';

import AppError from '@shared/errors/AppError';
import IPushNotificationProvider from '../models/IPushNotificationProvider';
import ISendPushNotificationDTO from '../dtos/ISendPushNotificationDTO';

interface IContent {
  en?: string;
}

interface IData {
  app_id: string | undefined;
  headings: IContent;
  contents: IContent;
  channel_for_external_user_ids?: string;
  include_external_user_ids?: string[];
}

export default class OneSignalProvider implements IPushNotificationProvider {
  public async sendPushNotification({
    include_external_user_ids,
    contents,
    headings,
    send_after,
    channel_for_external_user_ids,
    app_id,
    key_id,
    colapse_id,
    included_segments,
  }: ISendPushNotificationDTO): Promise<void> {
    const sendNotification = (data: IData) => {
      const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${key_id}`,
      };
      data = JSON.parse(JSON.stringify(data));
      console.log({ data });

      const options = {
        host: 'onesignal.com',
        port: 443,
        path: '/api/v1/notifications',
        method: 'POST',
        headers,
      };

      const request = https.request(options, response => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        response.on('data', data => {});
      });
      request.on('error', e => {
        console.log(e);
        throw new AppError('Erro ao enviar a notificação');
      });

      request.write(JSON.stringify(data));
      request.end();
    };

    const message = {
      app_id,
      headings,
      contents,
      channel_for_external_user_ids,
      include_external_user_ids,
      send_after,
      included_segments,
      colapse_id,
    };

    sendNotification(message);
  }
}
