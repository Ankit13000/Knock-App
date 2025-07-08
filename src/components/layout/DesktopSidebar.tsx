'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Trophy, User, Wallet, Zap, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const mainNavItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/referrals', icon: Gift, label: 'Referrals' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const secondaryNavItems = [
    { href: '/settings', icon: Settings, label: 'Settings' },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:border-r">
      <div className="flex flex-grow flex-col gap-y-5 overflow-y-auto bg-card p-4">
        <Link href="/home" className="flex h-16 shrink-0 items-center gap-3 px-2">
          <Zap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tighter text-foreground">Knock</span>
        </Link>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {mainNavItems.map((item) => {
                   const isActive = pathname.startsWith(item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                          isActive && 'bg-primary/10 text-primary'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="mt-auto">
               <Separator className="my-2"/>
               <ul role="list" className="-mx-2 space-y-1">
                {secondaryNavItems.map((item) => {
                     const isActive = pathname.startsWith(item.href);
                    return (
                        <li key={item.label}>
                        <Link
                            href={item.href}
                            className={cn(
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                            isActive && 'bg-primary/10 text-primary'
                            )}
                        >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.label}
                        </Link>
                        </li>
                    );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
