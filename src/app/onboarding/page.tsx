import { OnboardingCarousel } from '@/components/onboarding/OnboardingCarousel';
import { Zap } from 'lucide-react';

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-grid-pattern p-4">
        <div className="flex items-center gap-2 mb-8">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tighter text-foreground">Knock</span>
        </div>
      <OnboardingCarousel />
    </div>
  );
}
