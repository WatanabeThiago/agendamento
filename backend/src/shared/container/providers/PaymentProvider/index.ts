import { container } from 'tsyringe';

import IPaymentProvider from './models/IPaymentProvider';
import PaymentProvider from './implementations/PaymentProvider';

container.registerSingleton<IPaymentProvider>(
  'PaymentProvider',
  PaymentProvider,
);
