export default interface ICreateBankAccountDTO {
  transfer_day?: number;
  bank_code: string;
  agencia: string;
  agencia_dv?: string;
  conta: string;
  conta_dv: string;
  type: string;
  document_number: string;
  legal_name: string;
}
