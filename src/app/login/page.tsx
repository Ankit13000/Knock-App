'use client';

import Link from 'next/link';
import { Zap, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M21.35 11.1h-9.2v2.8h5.3c-.2 1.9-1.2 3.4-2.9 4.5v2.3h3c1.8-1.6 2.8-4.1 2.8-6.8 0-.6-.1-1.2-.2-1.8z"/>
        <path fill="#34A853" d="M12.15 22c2.4 0 4.5-1.1 6-2.9l-3-2.3c-.8.6-1.8.9-2.9.9-2.2 0-4.1-1.5-4.8-3.5H3.05v2.4c1.4 2.8 4.3 4.8 7.1 4.8z"/>
        <path fill="#FBBC05" d="M7.35 14.2c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V8.2H3.05c-.8 1.6-1.3 3.4-1.3 5.4s.5 3.8 1.3 5.4l4.3-3.6z"/>
        <path fill="#EA4335" d="M12.15 6.4c1.3 0 2.5.5 3.4 1.4l2.6-2.6C16.6 3.2 14.5 2 12.15 2 9.35 2 6.45 4 5.05 6.8l4.3 3.5c.7-2 2.6-3.5 4.8-3.5z"/>
    </svg>
);


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-grid-pattern p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <Zap className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-bold tracking-tighter">Welcome Back!</CardTitle>
          <CardDescription>Log in to continue the fun.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email or Mobile Number</Label>
                <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full btn-gradient">
                <LogIn className="mr-2 h-4 w-4" /> Log In
            </Button>
          </form>
          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline" className="w-full">
            <GoogleIcon />
            <span className="ml-2">Sign in with Google</span>
          </Button>

          <div className="space-y-2 text-center">
             <p className="text-sm text-muted-foreground">
                Don't have an account? <Link href="/signup" className="underline text-primary">Sign Up</Link>
            </p>
             <p className="text-sm text-muted-foreground">
                <Link href="/home" className="underline">Continue as Guest</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
