import BalanceCard from '@/components/dashboard/BalanceCard';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
        </h1>
        <p className="text-sm text-muted-foreground">Here's your financial overview</p>
      </div>

      <BalanceCard />
      <QuickActions />
      <TransactionHistory limit={5} />
    </div>
  );
};

export default Dashboard;
