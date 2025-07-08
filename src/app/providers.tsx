'use client'

import { UserProvider } from '@/context/UserContext';
import { AppProvider } from '@/context/AppContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AppProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </AppProvider>
    )
}
