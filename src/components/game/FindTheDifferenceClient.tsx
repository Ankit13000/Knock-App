
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Clock, Loader2, Target, X, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

const GAME_DURATION = 30; // seconds
const MAX_WRONG_CLICKS = 4;

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
  const [wrongClicks, setWrongClicks] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; x: number; y: number } | null>(null);
  const [isQuitConfirmOpen, setIsQuitConfirmOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const foundCount = differences.filter(d => d.find).length;

  useEffect(() => {
    if (!competitionId) {
       router.push('/home');
    }
  }, [competitionId, router]);

  // Main game loop for timer and win condition
  useEffect(() => {
    if (isGameOver) return;

    const isFinished = timeLeft <= 0 || (competition && foundCount === differences.length);

    if (isFinished) {
      setIsGameOver(true);
      setTimeout(() => router.push(`/results?score=${score}`), 4000); // 4-second delay
      return;
    }

    if (!isQuitConfirmOpen) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, foundCount, router, competition, score, isQuitConfirmOpen, isGameOver]);
  
  // Game over check for too many wrong clicks
  useEffect(() => {
    if (wrongClicks >= MAX_WRONG_CLICKS && !isGameOver) {
      setIsGameOver(true);
      setTimeout(() => router.push(`/results?status=lost&score=0`), 4000);
    }
  }, [wrongClicks, router, isGameOver]);

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
    const target = e.target as HTMLElement;
    if (target.closest('[data-ishotspot="true"]')) return;
    
    setWrongClicks(prev => prev + 1);
    setScore(prev => Math.max(0, prev - 20));
    setFeedback({ type: 'wrong', x: e.clientX, y: e.clientY });
  };
  
  const handleQuit = () => {
    router.push('/results?status=forfeited');
  };

  if (!competition) {
    return (
       <div className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading Game...</p>
      </div>
    );
  }
  
  const GameStat = ({ icon: Icon, value, label, iconClassName }: { icon: React.ElementType, value: string | number, label: string, iconClassName?: string }) => (
    <div className="flex items-center gap-3 rounded-full bg-black/30 px-4 py-2 text-white backdrop-blur-sm">
        <Icon className={cn("h-6 w-6", iconClassName)} />
        <div className="text-left">
            <div className="text-sm font-semibold tracking-wider">{label}</div>
            <div className="text-xl font-bold">{value}</div>
        </div>
    </div>
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-gray-900 text-white">
      {/* Vignette effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50"></div>
      
      {/* Top Bar */}
      <div className="z-10 flex w-full flex-col p-4 md:gap-4">
        <Progress value={(timeLeft / GAME_DURATION) * 100} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary" />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 md:mt-0">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tighter">{competition.title}</h1>
                <div className="flex items-center gap-2">
                    {differences.map((d, i) => (
                        <div key={i} className={`h-3 w-3 rounded-full transition-colors ${d.found ? 'bg-primary' : 'bg-white/30'}`}></div>
                    ))}
                </div>
            </div>
            <AlertDialog open={isQuitConfirmOpen} onOpenChange={setIsQuitConfirmOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isGameOver}>
                  <X className="h-6 w-6" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    If you quit now, your progress will be lost and the game will be forfeited.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue Playing</AlertDialogCancel>
                  <AlertDialogAction onClick={handleQuit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Quit Game
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>
      
      {/* Game Area */}
      <div className="flex w-full flex-1 flex-col items-stretch gap-4 p-4 pt-0 md:flex-row md:p-4">
        {/* Image 1 (Reference) */}
        <div className={cn("relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 ring-2 ring-primary/50", !isGameOver && "cursor-crosshair")} onClick={isGameOver ? undefined : handleWrongClick}>
             <Image 
                src={competition.image} 
                alt="Find the difference reference" 
                layout="fill" 
                objectFit="cover"
                priority
                data-ai-hint={competition.imageHint} 
             />
             <div className="absolute bottom-4 left-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                 <GameStat icon={Target} value={score} label="Score" iconClassName="text-primary" />
                 <GameStat icon={XCircle} value={`${Math.max(0, MAX_WRONG_CLICKS - wrongClicks)}`} label="Tries Left" iconClassName="text-destructive" />
             </div>
        </div>
        
        {/* Image 2 (Interactive) */}
        <div className={cn("relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl shadow-2xl shadow-accent/20 ring-2 ring-accent/50", !isGameOver && "cursor-crosshair")} onClick={isGameOver ? undefined : handleWrongClick}>
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
                     className={cn(
                         "absolute rounded-full transition-all duration-300",
                         isGameOver ? "pointer-events-none" : "cursor-pointer"
                     )}
                     style={{ top: diff.top, left: diff.left, width: diff.size, height: diff.size, transform: 'translate(-50%, -50%)' }}
                     onClick={(e) => { 
                        if (isGameOver) return;
                        e.stopPropagation(); 
                        handleFound(diff.id, e); 
                    }}
                >
                    {(diff.found || isGameOver) && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Circle className={cn(
                                "w-full h-full stroke-[5px]",
                                diff.found ? "text-green-400/90" : "text-yellow-400/90" // Green for found, yellow for missed
                            )} />
                        </motion.div>
                    )}
                </div>
            ))}
             <div className="absolute bottom-4 right-4" onClick={(e) => e.stopPropagation()}>
                 <GameStat icon={Clock} value={isGameOver ? '0s' : `${timeLeft}s`} label="Time Left" iconClassName="text-accent" />
             </div>
        </div>
      </div>

      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold tracking-tighter">
                {wrongClicks >= MAX_WRONG_CLICKS ? "Game Over" : foundCount === differences.length ? "Perfect!" : "Time's Up!"}
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">Calculating your final score...</p>
            </div>
          </motion.div>
        )}
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
