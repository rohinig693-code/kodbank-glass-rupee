import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const TransferForm = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setRecipient('');
      setAmount('');
      setNote('');
    }, 2000);
  };

  return (
    <div className="glass-card-highlight p-6">
      <h3 className="mb-5 text-sm font-semibold text-foreground">Send Money</h3>

      {success ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-3 py-8"
        >
          <CheckCircle className="h-12 w-12 text-success" />
          <p className="font-medium text-foreground">Transfer Successful!</p>
          <p className="text-sm text-muted-foreground">₹{Number(amount).toLocaleString('en-IN')} sent</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recipient UPI / Account
            </label>
            <input
              type="text"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="glass-input w-full text-foreground placeholder:text-muted-foreground"
              placeholder="name@upi or account number"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="glass-input w-full text-foreground placeholder:text-muted-foreground font-mono text-lg"
              placeholder="0.00"
              min="1"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="glass-input w-full text-foreground placeholder:text-muted-foreground"
              placeholder="Dinner split, rent, etc."
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="gradient-primary flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
            ) : (
              <>
                <Send className="h-4 w-4" /> Send Money
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default TransferForm;
