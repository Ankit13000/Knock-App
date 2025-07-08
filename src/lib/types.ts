export type Competition = {
  id: string;
  title: string;
  gameType: 'Find the Difference' | 'Quiz' | 'Puzzle';
  entryFee: number;
  prize: number;
  timeLeft: string;
  status: 'Live' | 'Upcoming' | 'Results';
  participants: number;
  totalSpots: number;
  image: string;
  imageHint: string;
  startTime: string;
};

export type Transaction = {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Entry Fee' | 'Winnings';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

export type User = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  avatar: string | null;
  walletBalance: number;
  wins: number;
  totalGames: number;
  totalEarned: number;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  prize: number;
  avatar: string | null;
};
