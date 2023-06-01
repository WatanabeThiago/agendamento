import StatusEnum from '@shared/enums/StatusEnum';

export interface ITransactionProviderCreditCardDTO {
  card_id: string;

  amount: number;
  user_id: string;
  name: string;
  cpf_cnpj: string;
  phone_number: string;
  email: string;

  billing: {
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    street_number: string;
    zipcode: string;
  };
}

export interface ITransactionProviderSaveCardDTO {
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
}

export interface ITransactionProviderSaveCardResponseDTO {
  last_digits: string;
  brand: string;
  card_id: string;
  expiration_date: string;
}

export interface ITransactionResponseCreditCardDTO {
  status: StatusEnum;
}
