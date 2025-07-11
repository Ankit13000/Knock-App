import type { Competition, Transaction, User, LeaderboardEntry, GameType } from './types';

export const mockUser: User = {
  id: 'usr_1',
  name: 'Alex Ray',
  email: 'alex.ray@example.com',
  joinDate: '2024-06-15',
  avatar: null,
  walletBalance: 1250.75,
  wins: 12,
  totalGames: 48,
  totalEarned: 5500,
  isBanned: false,
};

export const mockAdminUsers: User[] = [
  mockUser,
  {
    id: 'usr_2',
    name: 'Bethany Frank',
    email: 'beth.f@example.com',
    joinDate: '2024-07-01',
    avatar: 'https://placehold.co/40x40.png',
    walletBalance: 500.00,
    wins: 5,
    totalGames: 20,
    totalEarned: 1200,
    isBanned: false,
  },
  {
    id: 'usr_3',
    name: 'Charlie Day',
    email: 'charlie.d@example.com',
    joinDate: '2024-07-20',
    avatar: 'https://placehold.co/40x40.png',
    walletBalance: 75.50,
    wins: 1,
    totalGames: 10,
    totalEarned: 150,
    isBanned: true,
    banReason: 'Suspicious activity detected on account.',
    banExpiresAt: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], // Banned for 5 more days
  },
  {
    id: 'usr_4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    joinDate: '2024-05-10',
    avatar: 'https://placehold.co/40x40.png',
    walletBalance: 10000,
    wins: 150,
    totalGames: 200,
    totalEarned: 50000,
    isBanned: false,
  },
];

export const mockGameTypes: GameType[] = [
  { id: 'gt_1', name: 'Find the Difference' },
  { id: 'gt_2', name: 'Quiz' },
  { id: 'gt_3', name: 'Puzzle' },
];

export const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Jungle Jam',
    gameType: 'Find the Difference',
    entryFee: 50,
    prize: 500,
    timeLeft: '1h 15m',
    status: 'Live',
    participants: 8,
    totalSpots: 10,
    image: 'https://images.unsplash.com/photo-1710131991542-abec46c42b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmaW5kJTIwZGlmZmVyZW5jZSUyMGluJTIwMiUyMGltYWdlfGVufDB8fHx8MTc1MjA2NjgwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'jungle animals',
    startTime: 'Live Now'
  },
  {
    id: '2',
    title: 'Cityscapes Quiz',
    gameType: 'Quiz',
    entryFee: 100,
    prize: 1000,
    timeLeft: 'Starts in 3h',
    status: 'Upcoming',
    participants: 2,
    totalSpots: 10,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8Z2FtZXxlbnwwfHx8fDE3NTIwNDk3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'city skyline quiz',
    startTime: 'Today at 8:00 PM'
  },
  {
    id: '3',
    title: 'Ocean Oddities Puzzle',
    gameType: 'Puzzle',
    entryFee: 25,
    prize: 200,
    timeLeft: 'Ended',
    status: 'Results',
    participants: 10,
    totalSpots: 10,
    image: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8cmVzdWx0fGVufDB8fHx8MTc1MjA2Nzg3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'ocean puzzle',
    startTime: 'Yesterday at 5:00 PM'
  },
    {
    id: '4',
    title: 'Desert Dreams',
    gameType: 'Quiz',
    entryFee: 75,
    prize: 750,
    timeLeft: 'Starts in 1d',
    status: 'Upcoming',
    participants: 4,
    totalSpots: 10,
    image: 'https://images.unsplash.com/photo-1594652634010-275456c808d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8Z2FtZXxlbnwwfHx8fDE3NTIwNDk3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'desert landscape',
    startTime: 'Tomorrow at 3:00 PM'
  },
];

export const mockTransactions: Transaction[] = [
  { id: '1', userId: 'usr_1', userName: 'Alex Ray', type: 'Deposit', amount: 500, date: '2024-07-28', status: 'Completed' },
  { id: '2', userId: 'usr_1', userName: 'Alex Ray', type: 'Entry Fee', amount: -50, date: '2024-07-28', status: 'Completed' },
  { id: '3', userId: 'usr_1', userName: 'Alex Ray', type: 'Winnings', amount: 500, date: '2024-07-27', status: 'Completed' },
  { id: '4', userId: 'usr_2', userName: 'Bethany Frank', type: 'Withdrawal', amount: -1000, date: '2024-07-26', status: 'Pending' },
  { id: '5', userId: 'usr_3', userName: 'Charlie Day', type: 'Entry Fee', amount: -100, date: '2024-07-25', status: 'Completed' },
  { id: '6', userId: 'usr_4', userName: 'Diana Prince', type: 'Deposit', amount: 1000, date: '2024-07-24', status: 'Completed' },
];

export const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'CyberNinja', score: 15200, prize: 5000, avatar: 'https://placehold.co/40x40.png' },
    { rank: 2, name: 'PixelProwler', score: 14950, prize: 2500, avatar: 'https://placehold.co/40x40.png' },
    { rank: 3, name: 'QuantumQueen', score: 14800, prize: 1000, avatar: 'https://placehold.co/40x40.png' },
    { rank: 4, name: mockUser.name, score: 14500, prize: 500, avatar: mockUser.avatar },
    { rank: 5, name: 'VortexViper', score: 14200, prize: 250, avatar: 'https://placehold.co/40x40.png' },
    { rank: 6, name: 'DreamWeaver', score: 13900, prize: 100, avatar: 'https://placehold.co/40x40.png' },
    { rank: 7, name: 'GhostGlider', score: 13500, prize: 50, avatar: 'https://placehold.co/40x40.png' },
];
