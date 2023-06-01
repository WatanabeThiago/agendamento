import StatusEnum from '@shared/enums/StatusEnum';
import {
  ITransactionProviderCreditCardDTO,
  ITransactionProviderSaveCardDTO,
  ITransactionProviderSaveCardResponseDTO,
} from '../dtos/ITransactionProviderDTOS';
import ITransactionProvider from '../models/ITransactionProvider';

export default class FakeTransactionProvider implements ITransactionProvider {
  private cards: ITransactionProviderSaveCardDTO[] = [];

  async transactionCreditCard(
    _: ITransactionProviderCreditCardDTO,
  ): Promise<StatusEnum> {
    return StatusEnum.Approved;
  }

  async saveCard(
    datas: ITransactionProviderSaveCardDTO,
  ): Promise<ITransactionProviderSaveCardResponseDTO> {
    this.cards.push(datas);

    return {
      brand: 'Visa',
      card_id: 'nOIw6nzZzNTdZg1xxQ3',
      expiration_date: '1221',
      last_digits: '1234',
    };
  }
}
