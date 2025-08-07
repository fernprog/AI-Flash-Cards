interface FlashCardsProps {
  card: {
    question: string;
    answer: string;
    difficulty: string;
    subject: string;
  };
  showText: boolean;
  handleClick: () => void;
  handleNext: () => void;
}

export default function FlashCards({
    card,
    showText,
    handleClick,
    handleNext
}: FlashCardsProps) {
    return(
    <div className="flex flex-col justify-between bg-[var(--surface)] text-[var(--text-primary)] rounded-2xl shadow-lg p-6 w-125 h-75 text-center">
      {/* Centered Text */}
      <div className="flex-1 flex justify-center items-center">
        {showText ? (
          <p className="text-[var(--text-secondary)] text-lg">{card.answer}</p>
        ) : (
          <p className="text-[var(--text-primary)] text-lg">{card.question}</p>
        )}
      </div>

      {/* Buttons at Bottom */}
      <div className="flex justify-between">
        <button
          className="mt-4 px-4 py-2 bg-[var(--answer)] border border-white text-white rounded-full hover:bg-[var(--answerhover)]"
          onClick={handleClick}
        >
          Answer
        </button>
        <button
          className="mt-4 px-4 py-2 bg-[var(--next)] border border-white text-white rounded-full hover:bg-[var(--nexthover)]"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
    )
}