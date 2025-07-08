'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { Camera, Edit, Gamepad2, LogOut, ShieldCheck, Trash2, Trophy, Wallet } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getInitials } from '@/lib/utils';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});


export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = [
    { icon: Gamepad2, label: 'Total Games', value: user.totalGames },
    { icon: Trophy, label: 'Wins', value: user.wins },
    { icon: Wallet, label: 'Total Earned', value: `₹${user.totalEarned.toLocaleString()}`},
  ];

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
    },
  });

  useEffect(() => {
    form.reset({ name: user.name });
  }, [user.name, form]);

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    setUser(prevUser => ({...prevUser, name: values.name}));
    toast({
      title: "Profile Updated",
      description: "Your name has been successfully updated.",
    });
    setIsEditDialogOpen(false);
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevUser => ({...prevUser, avatar: reader.result as string}));
        toast({
          title: "Profile Picture Updated",
          description: "Your new picture has been saved.",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveAvatar = () => {
    setUser(prevUser => ({...prevUser, avatar: null}));
    toast({
      title: "Profile Picture Removed",
      description: "Your default avatar will be shown.",
    });
  }

  const handleLogout = () => {
    router.push('/login');
  };


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <div>
        <h1 className="text-3xl font-bold tracking-tighter">My Profile</h1>
        <p className="text-muted-foreground">View and manage your account details.</p>
      </div>

      <Card>
        <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-positive" />
                Verified Player
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center my-6">
                {stats.map(stat => (
                    <div key={stat.label} className="p-4 bg-card rounded-lg">
                        <stat.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                     <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={user.avatar || undefined} alt={user.name} />
                            <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                           <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                             <Camera className="mr-2 h-4 w-4" /> Change Picture
                           </Button>
                           <Button variant="ghost" size="sm" onClick={handleRemoveAvatar} disabled={!user.avatar}>
                             <Trash2 className="mr-2 h-4 w-4" /> Remove
                           </Button>
                           <input 
                              type="file"
                              ref={fileInputRef}
                              onChange={handleAvatarChange}
                              className="hidden"
                              accept="image/png, image/jpeg"
                            />
                        </div>
                    </div>
                    <Separator />
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
