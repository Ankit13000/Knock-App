'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bell, Send, Trophy, Award } from 'lucide-react';

export default function NotificationsPage() {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('announcement');

  const handleSendNotification = () => {
    if (!title || !message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill out all fields.',
      });
      return;
    }

    // In a real app, this would trigger a backend service (e.g., Firebase Cloud Functions)
    // to send push notifications or emails to users.
    console.log('Sending notification:', { type, title, message });

    toast({
      title: 'Notification Sent!',
      description: `Your "${title}" message has been broadcasted.`,
    });

    // Reset form
    setTitle('');
    setMessage('');
    setType('announcement');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Send Notifications</h1>
        <p className="text-muted-foreground">Broadcast announcements and alerts to all users.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
          <CardDescription>Craft your notification and send it to your user base.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="notification-type">Notification Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="notification-type">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" /> General Announcement
                  </div>
                </SelectItem>
                <SelectItem value="new-game">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" /> New Game Launched
                  </div>
                </SelectItem>
                <SelectItem value="winner">
                   <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-positive" /> Winner Announcement
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notification-title">Title</Label>
            <Input
              id="notification-title"
              placeholder="e.g., New Tournament Live!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notification-message">Message</Label>
            <Textarea
              id="notification-message"
              placeholder="Enter the main content of your notification here."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <Button onClick={handleSendNotification} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Notification to All Users
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
