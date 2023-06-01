export default interface ICreateCreditCardDTO {
  // * Número do cartão
  card_number: string;

  // * Data de expiração do cartão
  card_expiration_date: string;

  // * Nome no cartão do portador
  card_holder_name: string;
}
