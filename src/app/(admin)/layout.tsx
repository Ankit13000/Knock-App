'use client';

import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { sendNotification } from '@/ai/flows/send-notification-flow';
import { GlobalBanUserForm } from '@/components/admin/GlobalBanUserForm';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { 
    isGlobalBanFormOpen, 
    setIsGlobalBanFormOpen,
    users,
    updateUser
  } = useApp();
  const { toast } = useToast();

  const handleConfirmBan = async (userId: string, reason: string, durationDays: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
      toast({ variant: 'destructive', title: "Error", description: "User not found." });
      return;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationDays);

    updateUser({
        ...user,
        isBanned: true,
        banReason: reason,
        banExpiresAt: expiryDate.toISOString().split('T')[0],
    });

    try {
        await sendNotification({
            title: "Account Suspended",
            message: `Your account has been temporarily suspended for ${durationDays} days. Reason: ${reason}. Your access will be restored on ${expiryDate.toLocaleDateString()}.`,
        });
        toast({ title: "User Banned", description: `${user.name} has been banned for ${durationDays} days.` });
    } catch (error) {
        toast({ variant: 'destructive', title: "Notification Failed", description: "The user was banned, but the notification could not be sent." });
    }
    
    setIsGlobalBanFormOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar />
      <div className="flex w-full flex-1 flex-col sm:pl-56">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
       <GlobalBanUserForm
        isOpen={isGlobalBanFormOpen}
        onOpenChange={setIsGlobalBanFormOpen}
        onSave={handleConfirmBan}
        users={users}
      />
    </div>
  );
}
