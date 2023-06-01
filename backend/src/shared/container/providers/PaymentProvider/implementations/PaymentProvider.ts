/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import AppError from '@shared/errors/AppError';

import IPaymentProvider from '../models/IPaymentProvider';
import ICreateRecipientDTO from '../dtos/ICreateRecipientDTO';
import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';
import IUpdateRecipientDTO from '../dtos/IUpdateRecipientDTO';

import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ICreateCreditCardDTO from '../dtos/ICreateCreditCardDTO';
import ICaptureTransactionDTO from '../dtos/ICaptureTransactionDTO';

import IRefundTransactionDTO from '../dtos/IRefundTransactionDTO';

import ICreateTransferDTO from '../dtos/ICreateTransferDTO';

const pagarme = require('pagarme');

class PagarmeProvider implements IPaymentProvider {
  public async createTransfer(data: ICreateTransferDTO): Promise<any> {
    // ? Dados mockados pois nao é possível testar a integração no ambiente de testes da pagar.me
    return {
      object: 'transfer',
      id: 65485,
      amount: data.amount,
      type: 'ted',
      status: 'pending_transfer',
      source_type: 'recipient',
      source_id: 're_cix7pxz6f02ppcv6dn4ckcrcc',
      target_type: 'bank_account',
      target_id: '17346045',
      fee: 367,
      funding_date: null,
      funding_estimated_date: '2017-02-18T02:00:00.000Z',
      transaction_id: null,
      date_created: '2017-02-17T16:24:20.933Z',
      bank_account: {
        object: 'bank_account',
        id: 17346045,
        bank_code: '000',
        agencia: '00000',
        agencia_dv: '2',
        conta: '00000',
        conta_dv: '00',
        type: 'conta_corrente',
        document_type: 'cpf',
        document_number: '03602396681',
        legal_name: 'nome2',
        charge_transfer_fees: true,
        date_created: '2016-12-27T22:08:10.536Z',
      },
      metadata: {
        idProduto: '13933139',
      },
    };
  }

  public async refundTransaction(data: IRefundTransactionDTO): Promise<any> {
    data = JSON.parse(JSON.stringify(data));
    console.log({ datasdasdasa: data });
    console.log({
      amount: data.amount,
      async: data.async,
      id: data.id,
      split_rules: data.split_rules,
      bank_account: data.bank_account,
    });
    return new Promise((resolve, reject) => {
      pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) => {
          client.transactions.find({ id: data.id }).then((transaction: any) => {
            console.log(transaction);
            client.transactions
              .refund({
                amount: data.amount,
                async: data.async,
                id: data.id,
                split_rules: data.split_rules,
                bank_account: data.bank_account,
              })
              .then((refund: any) => {
                resolve(refund);
              })
              .catch((err: any) => {
                console.log({ qweqweqweqw: err.response.errors });
                console.log({
                  amount: data.amount,
                  async: data.async,
                  id: data.id,
                  split_rules: data.split_rules,
                  bank_account: data.bank_account,
                });
                throw new AppError(
                  `${err.response.errors[0].message} ${data.amount}`,
                );
              });
          });
        })
        .catch((err: any) => {
          console.log('w11s2312:', err);
          throw new AppError(err.message);
        });
    });
  }

  public async recipientBalance(recipient_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) =>
          client.balance.find({
            recipientId: recipient_id,
          }),
        )
        .then((balance: any) => resolve(balance))
        .catch((err: any) => reject(err));
    });
  }

  public async createRecipient(data: ICreateRecipientDTO): Promise<any> {
    try {
      const providerRes = await pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) => client.recipients.create(data))
        .then((recipient: any) => {
          return recipient;
        })
        .catch((err: any) => {
          console.log('w11s2312:', err);
          throw new AppError(err.response.errors[0].message);
        });
      return providerRes;
    } catch (err: any) {
      console.log({ errCreateRecipient: err });

      throw new AppError(err.message);
    }
  }

  public async updateRecipient(data: IUpdateRecipientDTO): Promise<any> {
    console.log('Method not implemented');
    throw new AppError('Method not implemented');
  }

  public async createCreditCard(data: ICreateCreditCardDTO): Promise<any> {
    try {
      const providerRes = await pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) => client.cards.create(data))
        .then((bankAccount: any) => {
          return bankAccount;
        })
        .catch((err: any) => {
          console.log('w11s2312:', err);
          throw new AppError(err.response.errors[0].message);
        });
      return providerRes;
    } catch (err: any) {
      console.log({ createwwwwCreditCardError: err });
      throw new AppError(err.message);
    }
  }

  public async captureTransaction(data: ICaptureTransactionDTO): Promise<any> {
    data = JSON.parse(JSON.stringify(data));
    let result: any;
    try {
      await pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) =>
          client.transactions.capture({
            id: data.transaction_id,
            amount: data.amount,
            split_rules: data.split_rules,
          }),
        )
        .then((transaction: any) => {
          result = transaction;
        })
        .catch((err: any) => {
          console.log('w11s2312:', err);
          throw new AppError(err.response.errors[0].message);
        });

      return result;
    } catch (err: any) {
      console.log({ essrreors: err });

      throw new AppError(err.message);
    }
  }

  public async createBankAccount(data: ICreateBankAccountDTO): Promise<any> {
    try {
      const providerRes = await pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) => client.bankAccounts.create(data))
        .then((bankAccount: any) => {
          return bankAccount;
        })
        .catch((err: any) => {
          console.log('w11s2312:', err);
          throw new AppError(err.response.errors[0].message);
        });
      return providerRes;
    } catch (err: any) {
      console.log({ createBankAccount: err });
      throw new AppError(err.message);
    }
  }

  public async updateBankAccount(data: IUpdateRecipientDTO): Promise<any> {
    console.log({ dataaaaa: data });
    try {
      const providerRes = await pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) =>
          client.recipients.update({
            id: data.id,
            bank_account_id: data.bank_account_id,
          }),
        )
        .then((bankAccount: any) => {
          return bankAccount;
        })
        .catch((err: any) => {
          throw new AppError(err.response.errors[0].message);
        });

      return providerRes;
    } catch (err: any) {
      console.log({ cre3ateBankAccount: err });
      throw new AppError(err.message);
    }
  }

  public async createTransaction(data: ICreateTransactionDTO): Promise<any> {
    data = JSON.parse(JSON.stringify(data));
    console.log({ data });
    let result: any;
    try {
      await pagarme.client
        .connect({ api_key: process.env.API_PAGARME_KEY })
        .then((client: any) => client.transactions.create(data))
        .then((transaction: any) => {
          result = transaction;
        })
        .catch((err: any) => {
          console.log({ catdchserr: err.response.errors });
          throw new AppError(err.response.errors[0].message);
        });

      return result;
    } catch (err: any) {
      console.log({ weqewwqweqwerrorspasssgarme: err });
      console.log({ data });
      throw new AppError(`${err.message} na transaction`);
    }
  }
}

export default PagarmeProvider;
