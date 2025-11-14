import { Link } from 'react-router-dom';
import { ArrowRight, Joystick, UtensilsCrossed, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
            <Sparkles className="h-3 w-3" />
            Gamestudio Lounge
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Book PlayStation stations, order gourmet snacks, and drop straight into play.
          </h1>
          <p className="text-lg text-white/70 sm:text-xl">
            Customers hop right in—no logins, no friction. Admins manage everything behind a secure console.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-lg shadow-primary/40 transition hover:scale-[1.02]"
          >
            Explore Customer Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#snacks"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white hover:text-white"
          >
            View Snacks Menu
            <UtensilsCrossed className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-4 text-left sm:grid-cols-3">
          {[
            {
              title: 'Instant Entry',
              description: 'Players land on dashboards immediately—no password walls or waiting.',
              icon: Joystick,
            },
            {
              title: 'Smart Scheduling',
              description: 'Real-time booking slots with pricing, durations, and station availability.',
              icon: ArrowRight,
            },
            {
              title: 'Admin Command',
              description: 'Secure /admin login keeps operations, orders, and inventory protected.',
              icon: Sparkles,
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <feature.icon className="mb-3 h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 bg-slate-950/90 py-6 text-center text-xs text-white/60">
        <p>© {new Date().getFullYear()} Gamestudio Lounge. All customer areas are public.</p>
        <p className="mt-2">
          Studio staff?
          <Link to="/admin/login" className="ml-1 text-primary underline-offset-2 hover:underline">
            Admin Login
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Index;
