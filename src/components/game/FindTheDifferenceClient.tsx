
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Clock, Loader2, Target, X, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

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

export function FindTheDifferenceClient({ competitionId }: { competitionId?: string }) {
  const router = useRouter();
  const { competitions } = useApp();
  
  const competition = useMemo(() => 
    competitionId ? competitions.find(c => c.id === competitionId) : undefined,
    [competitions, competitionId]
  );

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [differences, setDifferences] = useState<Difference[]>(initialDifferences);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; x: number; y: number } | null>(null);

  const foundCount = differences.filter(d => d.find).length;

  useEffect(() => {
    if (!competitionId) {
       router.push('/home');
    }
  }, [competitionId, router]);

  useEffect(() => {
    if (timeLeft <= 0 || (competition && foundCount === differences.length)) {
      setTimeout(() => router.push('/results'), 1500);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, foundCount, router, competition]);

  const handleFeedbackEnd = () => setFeedback(null);

  const handleFound = (id: number, e: React.MouseEvent) => {
    if (!differences.find(d => d.id === id)?.found) {
      const newDifferences = differences.map(d => (d.id === id ? { ...d, found: true } : d));
      setDifferences(newDifferences);
      setScore(prev => prev + 100 + timeLeft); // Bonus points for speed
      setFeedback({ type: 'correct', x: e.clientX, y: e.clientY });
    }
  };
  
  const handleWrongClick = (e: React.MouseEvent) => {
    // Check if the click was on an already found circle or a hotspot
    const target = e.target as HTMLElement;
    if (target.closest('[data-ishotspot="true"]')) return;
    
    setScore(prev => Math.max(0, prev - 20));
    setFeedback({ type: 'wrong', x: e.clientX, y: e.clientY });
  };
  
  if (!competition) {
    return (
       <div className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading Game...</p>
      </div>
    );
  }
  
  const GameStat = ({ icon: Icon, value, label, className }: { icon: React.ElementType, value: string | number, label: string, className?: string }) => (
    <div className={`flex items-center gap-3 text-white px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm ${className}`}>
        <Icon className="h-6 w-6" />
        <div className="text-left">
            <div className="text-sm font-semibold tracking-wider">{label}</div>
            <div className="text-xl font-bold">{value}</div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full items-center bg-gray-900 text-white relative overflow-hidden">
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50 pointer-events-none"></div>
      
      {/* Top Bar */}
      <div className="w-full p-4 z-10">
        <Progress value={(timeLeft / GAME_DURATION) * 100} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary" />
        <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tighter">{competition.title}</h1>
                <div className="flex items-center gap-2">
                    {differences.map((d, i) => (
                        <div key={i} className={`h-3 w-3 rounded-full transition-colors ${d.found ? 'bg-primary' : 'bg-white/30'}`}></div>
                    ))}
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => router.push('/home')}>
                <X className="h-6 w-6" />
            </Button>
        </div>
      </div>
      
      {/* Game Area */}
      <div className="flex-1 w-full p-4 flex flex-col md:flex-row gap-4">
        {/* Image 1 (Reference) */}
        <div className="relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 ring-2 ring-primary/50">
             <Image 
                src={competition.image} 
                alt="Find the difference reference" 
                layout="fill" 
                objectFit="cover"
                priority
                data-ai-hint={competition.imageHint} 
             />
             <div className="absolute bottom-4 left-4">
                 <GameStat icon={Target} value={score} label="Score" className="text-primary" />
             </div>
        </div>
        
        {/* Image 2 (Interactive) */}
        <div className="relative w-full flex-1 min-h-0 cursor-crosshair rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 ring-2 ring-accent/50" onClick={handleWrongClick}>
            <Image 
                src={competition.image} 
                alt="Find the difference interactive" 
                layout="fill" 
                objectFit="cover" 
                priority
                data-ai-hint={competition.imageHint} 
            />
            {differences.map(diff => (
                <div key={diff.id}
                     data-ishotspot="true"
                     className="absolute rounded-full transition-all duration-300"
                     style={{ top: diff.top, left: diff.left, width: diff.size, height: diff.size, transform: 'translate(-50%, -50%)' }}
                     onClick={(e) => { e.stopPropagation(); handleFound(diff.id, e); }}
                >
                    {diff.found && (
                        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <Circle className="w-full h-full text-green-400/90 stroke-[5px]" />
                        </motion.div>
                    )}
                </div>
            ))}
             <div className="absolute bottom-4 right-4">
                 <GameStat icon={Clock} value={`${timeLeft}s`} label="Time Left" className="text-accent" />
             </div>
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            key={Date.now()}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -20, transition: { duration: 0.2 } }}
            onAnimationComplete={handleFeedbackEnd}
            className="fixed"
            style={{ left: feedback.x, top: feedback.y, transform: 'translate(-50%, -50%)', zIndex: 100 }}
          >
            {feedback.type === 'correct' ? (
                <CheckCircle className="h-16 w-16 text-green-400" fill="rgba(255,255,255,0.8)" />
            ) : (
                <XCircle className="h-16 w-16 text-red-500" fill="rgba(255,255,255,0.8)" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
