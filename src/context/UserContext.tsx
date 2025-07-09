'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import { Zap } from 'lucide-react';

interface UserContextType {
  user: User | null; // Firestore user profile
  firebaseUser: FirebaseUser | null; // Firebase Auth user object
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const protectedRoutes = ['/home', '/profile', '/wallet', '/leaderboard', '/referrals', '/competition', '/game', '/settings'];
  const isProtectedRoute = protectedRoutes.some(p => pathname.startsWith(p));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setLoading(true);
      if (fbUser) {
        setFirebaseUser(fbUser);
        const userDocRef = doc(db, 'users', fbUser.uid);
        const unsubSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser({ id: docSnap.id, ...docSnap.data() } as User);
          } else {
            console.error("User profile not found in Firestore!");
            setUser(null); 
          }
          setLoading(false);
        });
        return () => unsubSnapshot();
      } else {
        setFirebaseUser(null);
        setUser(null);
        setLoading(false);
        if (isProtectedRoute) {
          router.push('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [router, pathname, isProtectedRoute]);

  if (loading && isProtectedRoute) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
        <div className="flex animate-fade-in-up flex-col items-center gap-4">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <div className="absolute h-full w-full rounded-full bg-primary/20 animate-ping"></div>
            <Zap className="relative h-20 w-20 text-primary" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!loading && !user && isProtectedRoute) {
      return null;
  }

  return (
    <UserContext.Provider value={{ user, firebaseUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
