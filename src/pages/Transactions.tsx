import TransactionHistory from '@/components/dashboard/TransactionHistory';

const Transactions = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">Transaction History</h1>
      <p className="text-sm text-muted-foreground">All your recent transactions</p>
    </div>
    <TransactionHistory />
  </div>
);

export default Transactions;
