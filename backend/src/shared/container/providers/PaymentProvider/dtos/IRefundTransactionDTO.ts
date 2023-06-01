import ISplitRules from './ISplitRules';

export default interface ICreateTransactionDTO {
  id: string;
  amount: number | string;
  split_rules?: {
    id: string;
    recipient_id: string;
    liable: boolean;
    charge_processing_fee: boolean;
    percentage?: number;
    amount?: number;
    charge_remainder: boolean;
  }[];

  async: boolean;
  bank_account?: {
    transfer_day?: number;
    bank_code: string;
    agencia: string;
    agencia_dv?: string;
    conta: string;
    conta_dv: string;
    type: string;
    document_number: string;
    legal_name: string;
  };
}
