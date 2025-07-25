import { useState } from "react";
import { testData } from "./data/test";
import FlashCards from "./components/FlashCards";

function App() {
  const [showText, setShowText] = useState(false);
  const [index, setIndex] = useState(0);
  const card = testData[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testData.length);
    setShowText(false)
  };

  const handleClick = () => {
    setShowText(!showText)
  };

  return (
    <main className="py-20">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <FlashCards
          card={card}
          showText={showText}
          handleClick={handleClick}
          handleNext={handleNext}
        />
      </div>
    </main>
  );
}

export default App;

