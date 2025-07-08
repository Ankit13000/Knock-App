'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Target, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { mockCompetitions } from '@/lib/mock-data';

const GAME_DURATION = 60; // seconds

type Difference = {
  id: number;
  top: string;
  left: string;
  size: string;
  found: boolean;
};

const initialDifferences: Difference[] = [
  { id: 1, top: '22%', left: '45%', size: '8%', found: false },
  { id: 2, top: '60%', left: '78%', size: '10%', found: false },
  { id: 3, top: '80%', left: '15%', size: '7%', found: false },
  { id: 4, top: '35%', left: '85%', size: '9%', found: false },
  { id: 5, top: '55%', left: '30%', size: '8%', found: false },
];

export function FindTheDifferenceClient() {
  const router = useRouter();
  const competition = mockCompetitions[0];
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [differences, setDifferences] = useState<Difference[]>(initialDifferences);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; x: number; y: number } | null>(null);

  const foundCount = differences.filter(d => d.find).length;

  useEffect(() => {
    if (timeLeft <= 0 || foundCount === differences.length) {
      setTimeout(() => router.push('/results'), 1000);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, foundCount, router]);

  const handleFeedbackEnd = () => setFeedback(null);

  const handleFound = (id: number, e: React.MouseEvent) => {
    const newDifferences = differences.map(d => (d.id === id ? { ...d, found: true } : d));
    setDifferences(newDifferences);
    setScore(prev => prev + 100 + timeLeft); // Bonus points for speed
    setFeedback({ type: 'correct', x: e.clientX, y: e.clientY });
  };
  
  const handleWrongClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-ishotspot="true"]')) return;
    setScore(prev => Math.max(0, prev - 20));
    setFeedback({ type: 'wrong', x: e.clientX, y: e.clientY });
  };

  return (
    <div className="flex flex-col h-full w-full items-center p-4 space-y-4">
      <Card className="w-full">
        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <Target className="h-6 w-6 text-primary"/>
                <span>Score: {score}</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-6 w-6 text-accent"/>
                <span>Time: {timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
                <CheckCircle2 className="h-6 w-6 text-green-500"/>
                <span>Found: {foundCount} / {differences.length}</span>
            </div>
        </CardContent>
        <Progress value={(timeLeft / GAME_DURATION) * 100} className="h-1" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full flex-1">
        <div className="relative w-full h-full">
             <Image src={competition.image} alt="Spot the difference 1" layout="fill" objectFit="contain" data-ai-hint={competition.imageHint} />
        </div>
        <div className="relative w-full h-full cursor-crosshair" onClick={handleWrongClick}>
            <Image src={competition.image} alt="Spot the difference 2" layout="fill" objectFit="contain" data-ai-hint={competition.imageHint} />
            {differences.map(diff => (
                <div key={diff.id}
                     data-ishotspot="true"
                     className="absolute rounded-full"
                     style={{ top: diff.top, left: diff.left, width: diff.size, height: diff.size, transform: 'translate(-50%, -50%)' }}
                     onClick={(e) => { e.stopPropagation(); if (!diff.found) handleFound(diff.id, e); }}
                >
                    {diff.found && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Circle className="w-full h-full text-green-400/80 stroke-[4px]" />
                        </motion.div>
                    )}
                </div>
            ))}
        </div>
      </div>
      <AnimatePresence>
        {feedback && (
          <motion.div
            key={Date.now()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onAnimationComplete={handleFeedbackEnd}
            className="fixed"
            style={{ left: feedback.x - 24, top: feedback.y - 24, zIndex: 100 }}
          >
            {feedback.type === 'correct' ? (
                <CheckCircle2 className="h-12 w-12 text-green-500" fill="white" />
            ) : (
                <XCircle className="h-12 w-12 text-red-500" fill="white" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
