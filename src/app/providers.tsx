'use client'

import { UserProvider } from '@/context/UserContext';
import { AppProvider } from '@/context/AppContext';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AppProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </AppProvider>
        </ThemeProvider>
    )
}
