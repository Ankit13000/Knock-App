'use client';

import { useState } from 'react';
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
import { mockUser } from '@/lib/mock-data';
import { Edit, Gamepad2, LogOut, ShieldCheck, Trophy, Wallet } from 'lucide-react';
import React from 'react';

const stats = [
  { icon: Gamepad2, label: 'Total Games', value: mockUser.totalGames },
  { icon: Trophy, label: 'Wins', value: mockUser.wins },
  { icon: Wallet, label: 'Total Earned', value: `₹${mockUser.totalEarned.toLocaleString()}`},
];

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});


export default function ProfilePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userName, setUserName] = useState(mockUser.name);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userName,
    },
  });

  React.useEffect(() => {
    form.reset({ name: userName });
  }, [userName, form]);

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    setUserName(values.name);
    toast({
      title: "Profile Updated",
      description: "Your name has been successfully updated.",
    });
    setIsEditDialogOpen(false);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <div>
        <h1 className="text-3xl font-bold tracking-tighter">My Profile</h1>
        <p className="text-muted-foreground">View and manage your account details.</p>
      </div>

      <Card>
        <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={mockUser.avatar} alt={userName} />
                <AvatarFallback className="text-3xl">{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userName}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                </DialogContent>
              </Dialog>

              <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
