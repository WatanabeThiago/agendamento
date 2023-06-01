export default interface ICreateRecipientDTO {
  object: 'recipient';
  id: string;
  transfer_enabled: boolean;
  last_transfer: null;
  transfer_interval: string;
  transfer_day: number;
  automatic_anticipation_enabled: boolean;
  automatic_anticipation_type: string;
  automatic_anticipation_days: null;
  automatic_anticipation_1025_delay: number;
  anticipatable_volume_percentage: number;
  date_created: Date;
  date_updated: Date;
  postback_url: string;
  status: string;
  status_reason: null;
  bank_account: {
    object: string;
    id: number;
    bank_code: string;
    agencia: string;
    agencia_dv: string;
    conta: string;
    conta_dv: string;
    type: string;
    document_type: string;
    document_number: string;
    legal_name: string;
    charge_transfer_fees: boolean;
    date_created: Date;
  };
  register_information: {
    type: string;
    document_number: string;
    name: string;
    site_url: string;
    email: string;
    phone_numbers: [
      {
        ddd: string;
        number: string;
        type: string;
      },
    ];
  };
}
