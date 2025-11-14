import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Gamepad2,
  LayoutDashboard,
  LogOut,
  Sparkles,
  User as UserIcon,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from '@/components/NavLink';
import { getCurrentUser, logout } from '@/lib/auth';
import { toast } from 'sonner';

export const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems =
    isAdmin
      ? [
          { label: 'Admin Hub', href: '/admin', icon: LayoutDashboard },
          { label: 'Community', href: '/profile', icon: Users },
        ]
      : [
          { label: 'Player Hub', href: '/dashboard', icon: LayoutDashboard },
          { label: 'Snacks Menu', href: '/dashboard#snacks', icon: UtensilsCrossed },
        ];

  const quickAction =
    isAdmin
      ? { label: 'New Slot', description: 'Open booking slots', route: '/admin' }
      : { label: 'Book Station', description: 'Reserve a console', route: '/dashboard' };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6">
      <div className="pointer-events-auto w-full max-w-6xl rounded-[26px] border border-white/10 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 px-4 py-3 shadow-[0px_18px_60px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
        <div className="flex flex-wrap items-center gap-4">
            <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/90 p-2 text-primary-foreground shadow-lg shadow-primary/40">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-semibold text-white">GameStudio OS</p>
                <p className="text-xs text-white/60">Immersive PlayStation lounge</p>
              </div>
            </Link>

            <div className="hidden flex-1 items-center justify-center gap-1.5 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="group flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white/70 transition hover:text-white"
                  activeClassName="bg-white/15 text-white shadow-inner"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-1.5 sm:ml-auto">
              <Badge variant="outline" className="hidden uppercase tracking-wide text-xs text-emerald-300 border-emerald-500/50 bg-emerald-500/10 sm:inline-flex">
                {isAdmin ? 'Admin' : 'Guest'}
              </Badge>
              <Button
                size="sm"
                onClick={() => navigate(quickAction.route)}
                className="hidden gap-2 rounded-full bg-gradient-to-r from-primary to-primary/70 px-5 py-1.5 text-primary-foreground shadow-lg shadow-primary/40 transition hover:scale-[1.02] hover:shadow-primary/60 lg:inline-flex"
              >
                <Sparkles className="h-4 w-4" />
                {quickAction.label}
              </Button>
              {isAdmin && (
                <>
                  <Button variant="ghost" size="icon" className="relative rounded-full border border-white/10 bg-white/5 text-white">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                      3
                    </span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full border border-white/10 bg-white/5 text-white">
                        <UserIcon className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                          <p className="text-xs text-primary capitalize">{user?.role}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
        </div>
      </div>
    </header>
  );
};
