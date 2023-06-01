import ISendPushNotificationDTO from '../dtos/ISendPushNotificationDTO';

export default interface IPushNotificationProvider {
  sendPushNotification(data: ISendPushNotificationDTO): Promise<void>;
}
