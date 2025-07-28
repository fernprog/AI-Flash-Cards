import type { Card } from "../types/card";

interface MiniFlashCardProps {
  card: Card;
}

export default function MiniFlashCard({ card }: MiniFlashCardProps) {
  return (
  <div className="bg-white rounded-xl shadow p-4 w-full h-full flex items-center justify-center text-center">
    <h3 className="text-base font-semibold">{card.category}</h3>
  </div>
  );
}
