/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { Agenda } from 'agenda';

import IProviderWorkRemindersRepository from '@modules/providers/repositories/IProviderWorkRemindersRepository';
import { addDays, differenceInDays, subDays, subMinutes } from 'date-fns';
import IServiceAppointmentsRepository from '@modules/serviceAppointments/repositories/IServiceAppointmentsRepository';
import { appSocketServer } from '@shared/infra/http/server';
import ESocketNotificationTypeEnum from '@shared/infra/socketIO/enums/ESocketNotificationTypeEnum';
import IJobProvider from '../IJobProvider';
import IPushNotificationProvider from '../../PushNotificationProvider/models/IPushNotificationProvider';

@injectable()
class AgendaJobProvider implements IJobProvider {
  private agenda: Agenda;

  constructor(
    @inject('ProviderWorkRemindersRepository')
    private providerWorkRemindersRepository: IProviderWorkRemindersRepository,

    @inject('PushNotificationProvider')
    private pushNotificationProvider: IPushNotificationProvider,

    @inject('ServiceAppointmentsRepository')
    private serviceAppointmentsRepository: IServiceAppointmentsRepository,
  ) {
    this.agenda = new Agenda({
      db: { address: process.env.MONGO_DB! },
    });
  }

  async checkPendingPaid(): Promise<void> {
    this.agenda.define('check_paid', async () => {
      console.log('check_paid');
      const toNotify = await this.providerWorkRemindersRepository.findBefore(
        subDays(new Date(), 3),
      );
      await Promise.all(
        toNotify.map(async current => {
          current.updated_at = new Date();
          this.providerWorkRemindersRepository.save(current);

          const daysDifference = differenceInDays(
            new Date(),
            current.created_at,
          );
          await this.pushNotificationProvider.sendPushNotification({
            app_id: process.env.ONE_SIGNAL_PROVIDERS_APP_ID!,
            key_id: process.env.ONE_SIGNAL_PROVIDERS_KEY!,
            contents: {
              en: `Você está a mais de ${daysDifference} dias fechado.`,
            },
            headings: {
              en: `Você continua fechado.`,
            },
            include_external_user_ids: [current.provider.id],
            colapse_id: '1',
          });
        }),
      );
    });

    this.agenda.define('check_dont_started', async () => {
      try {
        const toNotify =
          await this.serviceAppointmentsRepository.findBeforeAndDontStarted(
            subMinutes(new Date(), 30),
            { filters: {} },
          );
        console.log(
          `Achou ${toNotify.length} agendamentos para coisar manualmente.`,
        );
        await Promise.all(
          toNotify.map(async current => {
            if (!current.provider_dont_started_notified) {
              await this.pushNotificationProvider.sendPushNotification({
                include_external_user_ids: [current.user_id],
                contents: {
                  en: 'Prestador ainda não inicializou o deslocamento.',
                },
                headings: {
                  en: `Iremos intervir manualmente no seu atendimento.`,
                },
                app_id: process.env.ONE_SIGNAL_CLIENTS_APP_ID!,
                key_id: process.env.ONE_SIGNAL_CLIENTS_KEY!,
              });
              current.provider_dont_started_notified = true;
              this.serviceAppointmentsRepository.save(current);
            }
          }),
        );
        appSocketServer.emit('monitoring', {
          service_appointments: toNotify,
          notification_type:
            ESocketNotificationTypeEnum.ProvidersDontStartedAppointments,
        });
      } catch (err: any) {
        throw new Error(err);
      }
    });

    await this.agenda.start();

    await this.agenda.every('30 seconds', 'check_paid');
    await this.agenda.every('15 seconds', 'check_dont_started');
  }
}

export { AgendaJobProvider };
