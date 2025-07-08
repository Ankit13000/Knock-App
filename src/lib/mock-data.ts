import type { Competition, Transaction, User, LeaderboardEntry } from './types';

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
  },
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
    image: 'https://placehold.co/600x400.png',
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
    image: 'https://placehold.co/600x400.png',
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
    image: 'https://placehold.co/600x400.png',
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
    image: 'https://placehold.co/600x400.png',
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
