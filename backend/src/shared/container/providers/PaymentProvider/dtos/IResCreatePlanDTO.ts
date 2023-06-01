export default interface IResCreatePlanDTO {
  object: 'plan';
  id: number;
  amount: number;
  days: number;
  name: string;
  trial_days: number;
  date_created: string;
  payment_methods: string[];
  color?: string;
  charges?: string;
  installments: number;
  invoice_reminder?: string;
}
