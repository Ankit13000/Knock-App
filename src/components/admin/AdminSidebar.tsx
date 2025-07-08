'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, Trophy, Users, BarChartHorizontal, CreditCard, Gamepad2, Bell, Plug, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/competitions', icon: Trophy, label: 'Competitions' },
  { href: '/admin/game-types', icon: Gamepad2, label: 'Game Types' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/stats', icon: BarChartHorizontal, label: 'Statistics' },
  { href: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { href: '/admin/integrations', icon: Plug, label: 'Integrations' },
  { href: '/admin/notifications', icon: Bell, label: 'Notifications' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { setIsGlobalBanFormOpen } = useApp();

  return (
    <aside className="hidden sm:fixed sm:inset-y-0 sm:flex sm:w-56 sm:flex-col sm:border-r">
      <div className="flex flex-grow flex-col gap-y-5 overflow-y-auto bg-card p-4">
        <Link href="/admin" className="flex h-16 shrink-0 items-center gap-3 px-2">
          <Zap className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-foreground">Knock</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </Link>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin');
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      isActive && 'bg-primary/10 text-primary'
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <Separator className="my-2" />
            <li>
              <button
                onClick={() => setIsGlobalBanFormOpen(true)}
                className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-destructive hover:bg-destructive/10"
              >
                <Ban className="h-5 w-5 shrink-0" aria-hidden="true" />
                Ban a User
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
