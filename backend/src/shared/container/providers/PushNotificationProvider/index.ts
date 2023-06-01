import { container } from 'tsyringe';

import IPushNotificationProvider from './models/IPushNotificationProvider';

import OneSignalProvider from './implementations/OneSignalProvider';

container.registerSingleton<IPushNotificationProvider>(
  'PushNotificationProvider',
  OneSignalProvider,
);
