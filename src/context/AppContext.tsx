'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Competition, User } from '@/lib/types';
import { mockCompetitions, mockAdminUsers } from '@/lib/mock-data';

interface AppContextType {
  competitions: Competition[];
  addCompetition: (competition: Competition) => void;
  updateCompetition: (competition: Competition) => void;
  deleteCompetition: (id: string) => void;
  users: User[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [users, setUsers] = useState<User[]>(mockAdminUsers);

  const addCompetition = (competition: Competition) => {
    setCompetitions(prev => [competition, ...prev]);
  };

  const updateCompetition = (competitionToUpdate: Competition) => {
    setCompetitions(prev => prev.map(c => c.id === competitionToUpdate.id ? competitionToUpdate : c));
  };

  const deleteCompetition = (id: string) => {
    setCompetitions(prev => prev.filter(c => c.id !== id));
  };

  const value = {
    competitions,
    addCompetition,
    updateCompetition,
    deleteCompetition,
    users,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
