export default interface IUpdateRecipientDTO {
  id: string;
  bank_account_id?: string;
  transfer_enabled?: boolean;
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
