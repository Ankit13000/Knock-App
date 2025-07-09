'use client';

import Link from 'next/link';
import { Zap, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User } from '@/lib/types';

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M21.35 11.1h-9.2v2.8h5.3c-.2 1.9-1.2 3.4-2.9 4.5v2.3h3c1.8-1.6 2.8-4.1 2.8-6.8 0-.6-.1-1.2-.2-1.8z"/>
        <path fill="#34A853" d="M12.15 22c2.4 0 4.5-1.1 6-2.9l-3-2.3c-.8.6-1.8.9-2.9.9-2.2 0-4.1-1.5-4.8-3.5H3.05v2.4c1.4 2.8 4.3 4.8 7.1 4.8z"/>
        <path fill="#FBBC05" d="M7.35 14.2c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V8.2H3.05c-.8 1.6-1.3 3.4-1.3 5.4s.5 3.8 1.3 5.4l4.3-3.6z"/>
        <path fill="#EA4335" d="M12.15 6.4c1.3 0 2.5.5 3.4 1.4l2.6-2.6C16.6 3.2 14.5 2 12.15 2 9.35 2 6.45 4 5.05 6.8l4.3 3.5c.7-2 2.6-3.5 4.8-3.5z"/>
    </svg>
);

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPaymentPolicy, setAgreedToPaymentPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms || !agreedToPaymentPolicy) {
       toast({
        variant: 'destructive',
        title: 'Agreement Required',
        description: 'You must agree to all policies to continue.',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const newUserProfile: Omit<User, 'id'> = {
        name: name,
        email: firebaseUser.email!,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null,
        walletBalance: 0,
        wins: 0,
        totalGames: 0,
        totalEarned: 0,
        isBanned: false,
      };

      await setDoc(doc(db, "users", firebaseUser.uid), newUserProfile);
      
      toast({
        title: 'Account Created!',
        description: 'Welcome to Knock! Redirecting you now...',
      });
      
      router.push('/home');

    } catch (error: any) {
        let errorMessage = 'An unknown error occurred.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email address is already in use.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'The password is too weak. Please use at least 6 characters.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Please enter a valid email address.';
        }
        toast({
            variant: 'destructive',
            title: 'Sign Up Failed',
            description: errorMessage,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grid-pattern p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <Zap className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-bold tracking-tighter">Get Started with Knock</CardTitle>
          <CardDescription>Create an account to join the competition.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Alex Ray" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a secure password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coupon">Coupon Code (Optional)</Label>
              <Input id="coupon" placeholder="Have a referral code?" />
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))}
                    />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                    >
                        I agree to the <Link href="/settings/terms" target="_blank" className="underline text-primary">Terms & Conditions</Link>
                    </label>
                </div>
            </div>
             <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id="payment-policy"
                      checked={agreedToPaymentPolicy}
                      onCheckedChange={(checked) => setAgreedToPaymentPolicy(Boolean(checked))}
                    />
                    <label
                        htmlFor="payment-policy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                    >
                        I agree to the <Link href="/settings/refund" target="_blank" className="underline text-primary">Payment Policy</Link>
                    </label>
                </div>
            </div>
            
            <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline" className="w-full">
            <GoogleIcon />
            <span className="ml-2">Sign up with Google</span>
          </Button>

          <div className="space-y-2 text-center">
             <p className="text-sm text-muted-foreground">
                Already have an account? <Link href="/login" className="underline text-primary">Log In</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
