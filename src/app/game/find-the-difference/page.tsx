import { FindTheDifferenceClient } from '@/components/game/FindTheDifferenceClient';

export default function FindTheDifferencePage({ searchParams }: { searchParams: { id?: string } }) {
  return (
    <div className="fixed inset-0 bg-background z-50">
      <FindTheDifferenceClient competitionId={searchParams.id} />
    </div>
  );
}
