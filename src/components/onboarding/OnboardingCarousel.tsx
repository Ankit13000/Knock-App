'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const onboardingSteps = [
  {
    image: 'https://placehold.co/600x400.png',
    imageHint: 'welcome celebration',
    title: 'Welcome to Knock!',
    description: 'The ultimate platform for skill-based gaming competitions.',
  },
  {
    image: 'https://placehold.co/600x400.png',
    imageHint: 'money games',
    title: 'Play Skill-Based Games & Win Money',
    description: 'Challenge your skills and compete for real cash prizes.',
  },
  {
    image: 'https://placehold.co/600x400.png',
    imageHint: 'start competing',
    title: 'Start Competing Now!',
    description: 'Join thousands of players and climb the leaderboards.',
  },
];

export function OnboardingCarousel() {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {onboardingSteps.map((step, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/10">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={400}
                    height={300}
                    className="mb-6 aspect-video w-full rounded-lg object-cover"
                    data-ai-hint={step.imageHint}
                  />
                  <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                  
                  {index === onboardingSteps.length - 1 && (
                     <Link href="/signup" className="w-full">
                        <Button size="lg" className="mt-8 w-full btn-gradient">
                            Get Started
                        </Button>
                     </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
