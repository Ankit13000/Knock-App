'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="flex animate-fade-in-up flex-col items-center gap-4">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute h-full w-full rounded-full bg-primary/20 animate-ping"></div>
          <Zap className="relative h-20 w-20 text-primary" />
        </div>
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Knock</h1>
          <p className="text-muted-foreground">The Competition App</p>
        </div>
      </div>
    </div>
  );
}
