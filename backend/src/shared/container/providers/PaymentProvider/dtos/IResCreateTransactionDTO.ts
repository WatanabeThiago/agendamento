import ISplitRules from '@modules/signatures/dtos/ISplitRules';

export default interface IResCreateTransactionDTO {
  object: 'transaction';
  status:
    | 'processing'
    | 'authorized'
    | 'paid'
    | 'refunded'
    | 'waiting_payment'
    | 'pending_refund'
    | 'refused'
    | 'chargedback';
  refse_reason:
    | 'acquirer'
    | 'antifraud'
    | 'internal_error'
    | 'no_acquirer'
    | 'acquirer_timeout'
    | null;
  status_reason:
    | 'acquirer'
    | 'antifraud'
    | 'internal_error'
    | 'no_acquirer'
    | 'acquirer_timeout';
  acquirer_response_code: '0000';
  acquirer_name: 'development' | 'pagarme' | 'stone' | 'cielo' | 'rede';
  acquirer_id: string;
  authorization_code: string;
  soft_descriptor: string;
  tid: number;
  nsu: number;
  date_created: string;
  date_updated: string;
  amount: number;
  authorized_amount: number;
  paid_amount: number;
  refunded_amount: number;
  installments: number;
  id: number;
  cost: number;
  card_holder_name: string;
  card_last_digits: string;
  card_first_digits: string;
  card_brand: string;
  card_pin_mode: null;
  postback_url: string | null;
  payment_method: string;
  capture_method: string;
  antifraud_score: string | null;
  boleto_url: string | null;
  boleto_barcode: string | null;
  boleto_expiration_date: string | null;
  referer: string;
  ip: string;
  subscription_id: number | null;
  phone: string;
  address: string;
  customer: {
    object: 'customer';
    id: number;
    external_id: string;
    type: string;
    country: string;
    document_number: string | null;
    document_type: string;
    name: string;
    email: string;
    phone_numbers: [string];
    born_at: null;
    birthday: '1965-01-01';
    gender: string | null;
    date_created: string;
    documents: [
      {
        object: 'document';
        id: string;
        type: string;
        number: string;
      },
    ];
  };
  billing: {
    address: {
      object: string;
      street: string;
      complementary: string | null;
      street_number: string;
      neighborhood: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
      id: 145818;
    };
    object: 'billing';
    id: 30;
    name: string;
  };
  shipping: {
    address: {
      object: string;
      street: string;
      complementary: string | null;
      street_number: string;
      neighborhood: string;
      city: string;
      state: string;
      zipcode: string;
      country: 'br';
      id: number;
    };
    object: 'shipping';
    id: number;
    name: string;
    fee: number;
    delivery_date: string;
    expedited: boolean;
  };
  items: [
    {
      object: string;
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      category: string | null;
      tangible: boolean;
      venue: any;
      date: any;
    },
  ];
  card: {
    object: 'card';
    id: string;
    date_created: string;
    date_updated: string;
    brand: string;
    holder_name: string;
    first_digits: string;
    last_digits: string;
    country: string;
    fingerprint: string;
    valid: boolean;
    expiration_date: string;
  };
  split_rules: ISplitRules[];
  metadata: any;
  antifraud_metadata: any;
  reference_key: any;
}
