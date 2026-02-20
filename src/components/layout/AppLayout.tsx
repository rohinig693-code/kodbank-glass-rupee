import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Clock,
  User,
  ShieldCheck,
  LogOut,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transfers', label: 'Transfers', icon: ArrowLeftRight },
  { path: '/transactions', label: 'History', icon: Clock },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/security', label: 'Security', icon: ShieldCheck },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavContent = () => (
    <>
      <div className="mb-8 flex items-center gap-2 px-3">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight">
          <span className="gradient-text">Kod</span>bank
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`nav-link ${active ? 'active' : ''}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute left-0 top-0 h-full w-0.5 rounded-r bg-primary"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border pt-4">
        <div className="mb-3 flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="nav-link w-full text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-sidebar lg:p-5">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-lg lg:hidden">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-base font-bold">
            <span className="gradient-text">Kod</span>bank
          </span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 flex lg:hidden"
          >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative flex w-64 flex-col border-r border-border bg-sidebar p-5">
              <NavContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
