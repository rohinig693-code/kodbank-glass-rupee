import TransferForm from '@/components/dashboard/TransferForm';

const Transfers = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold text-foreground sm:text-2xl">Transfers</h1>
      <p className="text-sm text-muted-foreground">Send money instantly via UPI or bank transfer</p>
    </div>
    <div className="max-w-md">
      <TransferForm />
    </div>
  </div>
);

export default Transfers;
