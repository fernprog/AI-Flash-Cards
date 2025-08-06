import { useState, useEffect } from "react";
import FlashCards from "./components/FlashCards";
import AnimatedList from "./components/AnimatedList";
import type { Card } from "./types/Card";

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showText, setShowText] = useState(false);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setShowText(false);
  };

  const handleClick = () => {
    setShowText(!showText);
  };

  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/run-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: inputText }),
    });

    const result = await response.json();
    console.log(result);
  };

  interface FlashcardSet {
    id: number;
    title: string;
    description: string;
  }

  const [userSets, setUserSets] = useState<FlashcardSet[]>([]);

  useEffect(() => {
    async function loadUserData() {
      try {
        const res = await fetch("http://localhost:8000/flashcard-sets"); // your FastAPI endpoint
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log("Fetched sets:", data);
        setUserSets(data);
      } catch (err) {
        console.error("Failed to load user data", err);
      }
    }

    loadUserData();
  }, []);

const handleSelect = async (index: number) => {
  const selectedSet = userSets[index]; // Access full object via index
  console.log("this is the selected id " + selectedSet.id)
  const response = await fetch("http://localhost:8000/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_number: selectedSet.id }), // send the real ID
  });

  const flashcards = await response.json();
  console.log(flashcards);
  setCards(flashcards)
};
  
  return (
    <main>
      {/* Navbar */}
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start items-center gap-2">
            <img src="/assets/logo.png" alt="Flash Cards logo" className="w-10" />
            <span className="text-xl font-bold">MyLogo</span>
          </div>

          {/* Center: Links */}
          <div className="flex-1 flex justify-center gap-6">
            <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
          </div>

          {/* Right: Button */}
          <div className="flex-1 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="flex flex-col items-center gap-10 min-h-screen bg-gray-100 pt-24 px-4">
        {/* Input Form */}
        <div>
          <span className="text-lg font-bold"> Enter input:</span>
        </div>

        <form className="flex flex-row w-150 gap-1" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            placeholder="Enter your text"
            className="flex-1 border h-10 border-green-800 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="border rounded-md px-4 bg-black text-white"
          >
            Submit
          </button>
        </form>
          
        <AnimatedList
          items={userSets.map(set => set.title)}
          onItemSelect={(_, index) => {
            handleSelect(index)
          }}
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />

        {/* Flashcard */}
        <div className="">
        {cards.length > 0 && (
          <FlashCards
            card={cards[index]}
            showText={showText}
            handleClick={handleClick}
            handleNext={handleNext}
          />
        )}
        </div>
      </div>
    </main>
  );
}

export default App;
