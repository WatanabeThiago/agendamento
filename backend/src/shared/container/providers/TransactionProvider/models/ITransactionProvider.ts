import StatusEnum from '@shared/enums/StatusEnum';
import {
  ITransactionProviderSaveCardDTO,
  ITransactionProviderSaveCardResponseDTO,
  ITransactionProviderCreditCardDTO,
} from '../dtos/ITransactionProviderDTOS';

export default interface ITransactionProvider {
  transactionCreditCard(
    datas: ITransactionProviderCreditCardDTO,
  ): Promise<StatusEnum>;
  saveCard(
    datas: ITransactionProviderSaveCardDTO,
  ): Promise<ITransactionProviderSaveCardResponseDTO>;
}
