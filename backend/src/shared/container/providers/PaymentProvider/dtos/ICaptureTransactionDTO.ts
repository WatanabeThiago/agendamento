import ISplitRules from './ISplitRules';

export default interface ICaptureTransactionDTO {
  transaction_id: string;
  amount: string;
  split_rules?: ISplitRules[];
}
