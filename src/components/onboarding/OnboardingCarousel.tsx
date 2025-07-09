'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
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
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8Z2FtZXxlbnwwfHx8fDE3NTIwNDk3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'welcome celebration',
    title: 'Welcome to Knock!',
    description: 'The ultimate platform for skill-based gaming competitions.',
  },
  {
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8bW9uZXl8ZW58MHx8fHwxNzUyMDAyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'money games',
    title: 'Play Skill-Based Games & Win Money',
    description: 'Challenge your skills and compete for real cash prizes.',
  },
  {
    image: 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxnYW1lfGVufDB8fHx8MTc1MjA0OTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'start competing',
    title: 'Start Competing Now!',
    description: 'Join thousands of players and climb the leaderboards.',
  },
];

export function OnboardingCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-md"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {onboardingSteps.map((step, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/10">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                   <div className="relative w-full mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={400}
                      height={300}
                      className="aspect-video w-full object-cover"
                      data-ai-hint={step.imageHint}
                    />
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-background/30">
                       <motion.div
                        key={index} // Re-triggers animation on each slide
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'linear' }}
                      />
                    </div>
                  </div>
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
