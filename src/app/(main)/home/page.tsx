import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCompetitions, mockUser } from '@/lib/mock-data';
import { CompetitionCard } from '@/components/home/CompetitionCard';
import { SmartSuggestion } from '@/components/home/SmartSuggestion';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Ready to win big today?</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Active Competitions</h2>
        <div className="w-full md:w-48">
            <Select defaultValue="all">
            <SelectTrigger>
                <SelectValue placeholder="Filter by game" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                <SelectItem value="find-the-difference">Find the Difference</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="puzzle">Puzzle</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <SmartSuggestion />
        </div>
        {mockCompetitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </div>
  );
}
