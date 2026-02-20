import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Smartphone, Key, Lock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const securityItems = [
  {
    icon: Fingerprint,
    title: 'Biometric Login',
    description: 'Use fingerprint or face recognition',
    enabled: true,
  },
  {
    icon: Smartphone,
    title: 'Two-Factor Authentication',
    description: 'Extra security with SMS verification',
    enabled: true,
  },
  {
    icon: Key,
    title: 'Login Notifications',
    description: 'Get notified of new sign-ins',
    enabled: false,
  },
  {
    icon: Lock,
    title: 'Transaction PIN',
    description: 'Require PIN for all transfers',
    enabled: true,
  },
];

const Security = () => {
  const [items, setItems] = useState(securityItems);

  const toggle = (index: number) => {
    setItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, enabled: !item.enabled } : item))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">Security</h1>
        <p className="text-sm text-muted-foreground">Manage your security settings</p>
      </div>

      {/* Security score */}
      <div className="glass-card-highlight p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
            <ShieldCheck className="h-7 w-7 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">Strong</p>
            <p className="text-sm text-muted-foreground">Your account security is excellent</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="glass-card divide-y divide-border/50">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <button
              onClick={() => toggle(i)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                item.enabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${
                  item.enabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Change password */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-semibold text-foreground">Change Password</h3>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Last changed 45 days ago. We recommend changing your password regularly.
        </p>
        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Security;
