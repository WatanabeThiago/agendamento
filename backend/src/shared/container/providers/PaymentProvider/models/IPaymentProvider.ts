import IResCreateTransactionDTO from '@shared/container/providers/PaymentProvider/dtos/IResCreateTransactionDTO';
import ICreateRecipientDTO from '../dtos/ICreateRecipientDTO';
import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';
import IUpdateRecipientDTO from '../dtos/IUpdateRecipientDTO';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ICreateCreditCardDTO from '../dtos/ICreateCreditCardDTO';
import ICaptureTransactionDTO from '../dtos/ICaptureTransactionDTO';
import ICreateTransferDTO from '../dtos/ICreateTransferDTO';
import IRefundTransactionDTO from '../dtos/IRefundTransactionDTO';

export default interface IStorageProvider {
  // ? Recebedores
  createRecipient(data: ICreateRecipientDTO): Promise<any>;
  updateRecipient(data: IUpdateRecipientDTO): Promise<any>;
  recipientBalance(recipient_id: string): Promise<any>;

  createCreditCard(data: ICreateCreditCardDTO): Promise<any>;

  createTransfer(data: ICreateTransferDTO): Promise<any>;

  // ? Transações
  createTransaction(
    data: ICreateTransactionDTO,
  ): Promise<IResCreateTransactionDTO>;
  captureTransaction(data: ICaptureTransactionDTO): Promise<any>;
  refundTransaction(data: IRefundTransactionDTO): Promise<any>;

  // ? Conta bancaria
  createBankAccount(data: ICreateBankAccountDTO): Promise<any>;
  updateBankAccount(data: IUpdateRecipientDTO): Promise<any>;
}
