'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Competition, User, Transaction, GameType } from '@/lib/types';
import { mockCompetitions, mockAdminUsers, mockTransactions, mockGameTypes } from '@/lib/mock-data';

interface AppContextType {
  competitions: Competition[];
  addCompetition: (competition: Competition) => void;
  updateCompetition: (competition: Competition) => void;
  deleteCompetition: (id: string) => void;
  users: User[];
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  gameTypes: GameType[];
  addGameType: (gameType: GameType) => void;
  updateGameType: (gameType: GameType) => void;
  deleteGameType: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [users, setUsers] = useState<User[]>(mockAdminUsers);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [gameTypes, setGameTypes] = useState<GameType[]>(mockGameTypes);

  const addCompetition = (competition: Competition) => {
    setCompetitions(prev => [competition, ...prev]);
  };

  const updateCompetition = (competitionToUpdate: Competition) => {
    setCompetitions(prev => prev.map(c => c.id === competitionToUpdate.id ? competitionToUpdate : c));
  };

  const deleteCompetition = (id: string) => {
    setCompetitions(prev => prev.filter(c => c.id !== id));
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (transactionToUpdate: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === transactionToUpdate.id ? transactionToUpdate : t));
  };

  const addGameType = (gameType: GameType) => {
    setGameTypes(prev => [gameType, ...prev]);
  };

  const updateGameType = (gameTypeToUpdate: GameType) => {
    setGameTypes(prev => prev.map(gt => gt.id === gameTypeToUpdate.id ? gameTypeToUpdate : gt));
  };

  const deleteGameType = (id: string) => {
    setGameTypes(prev => prev.filter(gt => gt.id !== id));
  };

  const value = {
    competitions,
    addCompetition,
    updateCompetition,
    deleteCompetition,
    users,
    transactions,
    addTransaction,
    updateTransaction,
    gameTypes,
    addGameType,
    updateGameType,
    deleteGameType,
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
