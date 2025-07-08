import type { ReactNode } from 'react';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { Providers } from './providers';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen w-full bg-background">
        <DesktopSidebar />
        <div className="flex w-full flex-1 flex-col md:pl-64">
          <div className="flex-1 pb-20 md:pb-0">
            <AppHeader />
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
        <BottomNav />
      </div>
    </Providers>
  );
}
