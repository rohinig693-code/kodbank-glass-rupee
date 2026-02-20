import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Zap, Film, Utensils } from 'lucide-react';

const transactions = [
  { id: 1, name: 'Flipkart', category: 'Shopping', amount: -4299, icon: ShoppingBag, date: 'Today, 2:30 PM' },
  { id: 2, name: 'Salary Credit', category: 'Income', amount: 125000, icon: ArrowDownLeft, date: 'Today, 9:00 AM' },
  { id: 3, name: 'Starbucks', category: 'Food & Drink', amount: -580, icon: Coffee, date: 'Yesterday, 6:15 PM' },
  { id: 4, name: 'Electricity Bill', category: 'Utilities', amount: -2340, icon: Zap, date: 'Yesterday, 11:00 AM' },
  { id: 5, name: 'PVR Cinemas', category: 'Entertainment', amount: -750, icon: Film, date: '18 Feb, 8:00 PM' },
  { id: 6, name: 'Swiggy', category: 'Food & Drink', amount: -456, icon: Utensils, date: '18 Feb, 1:30 PM' },
  { id: 7, name: 'Freelance Payment', category: 'Income', amount: 35000, icon: ArrowDownLeft, date: '17 Feb, 4:00 PM' },
];

const TransactionHistory = ({ limit }: { limit?: number }) => {
  const items = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="glass-card divide-y divide-border/50">
      <div className="flex items-center justify-between p-4 pb-3">
        <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
        <span className="text-xs text-muted-foreground">{transactions.length} transactions</span>
      </div>
      {items.map((tx, i) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/30"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tx.amount > 0 ? 'bg-success/10' : 'bg-muted'}`}>
            <tx.icon className={`h-4 w-4 ${tx.amount > 0 ? 'text-success' : 'text-muted-foreground'}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{tx.name}</p>
            <p className="text-xs text-muted-foreground">{tx.date}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold font-mono ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
              {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-muted-foreground">{tx.category}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TransactionHistory;
