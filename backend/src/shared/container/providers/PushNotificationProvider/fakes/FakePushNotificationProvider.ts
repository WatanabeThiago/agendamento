import IPushNotificationProvider from '../models/IPushNotificationProvider';
import ISendPushNotificationDTO from '../dtos/ISendPushNotificationDTO';

export default class FakePushNotificationProvider
  implements IPushNotificationProvider
{
  private messages: any[] = [];

  public async sendPushNotification(
    data: ISendPushNotificationDTO,
  ): Promise<void> {
    this.messages.push(data);
  }
}
