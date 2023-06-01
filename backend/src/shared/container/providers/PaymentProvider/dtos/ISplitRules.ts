export default interface ISplitRules {
  recipient_id: string;
  liable: boolean;
  charge_processing_fee: boolean;
  percentage?: number;
  amount?: number;
  charge_remainder: boolean;
}
