import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, Building2, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  const fields = [
    { icon: User, label: 'Full Name', value: user?.name },
    { icon: Mail, label: 'Email', value: user?.email },
    { icon: Phone, label: 'Phone', value: user?.phone },
    { icon: CreditCard, label: 'Account Number', value: user?.accountNumber, mono: true },
    { icon: Building2, label: 'IFSC Code', value: user?.ifscCode, mono: true },
    { icon: Calendar, label: 'Member Since', value: user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">Profile</h1>
        <p className="text-sm text-muted-foreground">Your account information</p>
      </div>

      <div className="glass-card-highlight p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">Premium Account</p>
          </div>
        </div>

        <div className="space-y-4">
          {fields.map((field, i) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-4 py-3"
            >
              <field.icon className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{field.label}</p>
                <p className={`text-sm font-medium text-foreground ${field.mono ? 'font-mono' : ''}`}>
                  {field.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
