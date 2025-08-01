import type { Card } from "../types/card";

interface FlashCards {
    card: Card;
    showText: boolean;
    handleClick: () => void;
    handleNext: () => void;
}

export default function FlashCards({
    card,
    showText,
    handleClick,
    handleNext
}: FlashCards) {
    return(
        <div className="bg-white rounded-2xl shadow-lg p-6 w-96 text-center">
          <h2 className="text-xl font-semibold mb-2">{card.category}</h2>
          <p className="text-gray-600">{card.question}</p>
          {showText == true ? (<p>{card.answer}</p>) : null}
          <div className="flex justify-between">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600" onClick={handleClick} >
              Answer
            </button>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-blue-600" onClick={handleNext}> 
              Next
            </button>
          </div>
        </div>
    )
}