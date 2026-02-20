import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const BalanceCard = () => {
  const [visible, setVisible] = useState(true);
  const balance = 2847563.42;
  const change = 12.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-highlight relative overflow-hidden p-6 sm:p-8"
    >
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-[80px]" />

      <div className="relative">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Balance
          </span>
          <button
            onClick={() => setVisible(!visible)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>

        <div className="mb-4">
          <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {visible ? `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '₹••••••••'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            <TrendingUp className="h-3 w-3" />
            +{change}%
          </div>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
