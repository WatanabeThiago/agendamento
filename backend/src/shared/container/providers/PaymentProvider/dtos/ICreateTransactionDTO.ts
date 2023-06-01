import ISplitRules from './ISplitRules';

export default interface ICreateTransactionDTO {
  // * Valor a ser cobrado. Deve ser passado em centavos. Ex: R$ 10.00 = 1000. Deve ser no mínimo 1 real (100)
  amount: number;

  // * Ao realizar uma transação, retornamos o card_id do cartão, para que nas próximas transações ele possa ser utilizado como forma de identificar os dados de pagamento. Exemplo de utilização: One-click buy. OBS: apenas para transações de Cartão de crédito você deve passar o card_hash ou card_id. Caso inclua os dados do cartão diretamente pelo código, esse campo torna-se dispensável.
  card_id?: string;
  card_hash?: string;

  // * Nome do portador do cartão. OBS: apenas para transações de Cartão de crédito você deve passar o card_holder_name
  card_holder_name?: string;

  // * Data de validade do cartão no formato MMAA. OBS: apenas para transações de Cartão de crédito você deve passar o card_expiration_date
  card_expiration_date?: string;

  //* Número do cartão. OBS: apenas para transações de Cartão de crédito você deve passar o card_number
  card_number?: string;

  // * Código verificador do cartão. OBS: O card_cvv deve ser passado somente para transações de Cartão de crédito. Esse parâmetro também pode ser passado em conjunto com o card_id, para validarmos seu CVV na criação da transação.
  card_cvv?: string;

  // * Método de pagamento da transação. Aceita dois tipos: credit_card e boleto.
  payment_method: string;
  postback_url?: string;
  installments: string;

  // * Após a autorização de uma transação, você pode escolher se irá capturar ou adiar a captura do valor. Caso opte por postergar a captura, atribua o valor false.
  capture: boolean;

  // * Utilize false caso queira manter o processamento síncrono de uma transação. Ou seja, a resposta da transação é recebida na hora.
  async?: boolean;
  split_rules?: ISplitRules[];
  customer?: {
    external_id: string;
    name: string;
    type: string;
    country: string;
    email: string;
    documents: {
      type: string;
      number: string;
    }[];
    phone_numbers: string[];
    birthday: string;
  };
  billing: {
    name: string;
    address: {
      country: string;
      state: string;
      city: string;
      neighborhood: string;
      street: string;
      street_number: string;
      zipcode: string;
    };
  };
  shipping?: {
    name: string;
    fee: number;
    delivery_date: string;
    expedited: boolean;
    address: {
      country: string;
      state: string;
      city: string;
      neighborhood: string;
      street: string;
      street_number: string;
      zipcode: string;
    };
  };
  items: {
    id: string;
    title: string;
    unit_price: number;
    quantity: number;
    tangible: boolean;
  }[];
  pix_expiration_date?: Date;
  pix_addional_fields?: {
    name: string;
    value: string;
  }[];
}
