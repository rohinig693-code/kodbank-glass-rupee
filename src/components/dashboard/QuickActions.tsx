import { motion } from 'framer-motion';
import { Send, QrCode, Smartphone, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: Send, label: 'Send', color: 'text-primary', path: '/transfers' },
  { icon: QrCode, label: 'Scan & Pay', color: 'text-primary' },
  { icon: Smartphone, label: 'Recharge', color: 'text-primary' },
  { icon: Receipt, label: 'Bills', color: 'text-primary' },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => action.path && navigate(action.path)}
          className="glass-card flex flex-col items-center gap-2 p-4 transition-all hover:border-primary/30"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <action.icon className={`h-4 w-4 ${action.color}`} />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
