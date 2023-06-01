interface IJobProvider {
  checkPendingPaid(): Promise<void>;
}

export default IJobProvider;
