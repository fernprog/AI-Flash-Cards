import { useState, useEffect } from "react";
import FlashCards from "./components/FlashCards";
import AnimatedList from "./components/AnimatedList";
import Navbar from "./components/Navbar";
import type { Flashcard, FlashcardSet } from "./types/Flashcards";

function App() {
  const [index, setIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [showText, setShowText] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [userSets, setUserSets] = useState<FlashcardSet[]>([]);

  const defaultCard = {
    question: "How do you change me?",
    answer: "Select from your set list, or generate above :)",
    difficulty: "Easy",
    subject: "Tutorial",
  };

  //Keeps track of FC index for display/navigation
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setShowText(false);
  };

  //hides/unhides answer on FC
  const handleClick = () => {
    setShowText(!showText);
  };

  //This func uses the user prompt to make an AI generated FC and posts it to supabase.
  //It then pull the user's list of FC sets from supabase and updates the list gui. 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/run-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: inputText }),
    });

    //update list
    const new_sets = await response.json();
    setUserSets(new_sets.reverse());
  };

  //When user selects from list this func updates the displayed flashcards
  const handleSelect = async (index: number) => {
    const selectedSet = userSets[index];

    const response = await fetch("http://localhost:8000/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_number: selectedSet.id }),
    });

    const flashcards = await response.json();
    setCards(flashcards)
    setShowText(false);
  };

  //On page load grabs the user's FC sets of the list component to display.
  useEffect(() => {
    async function loadUserData() {
      try {
        const res = await fetch("http://localhost:8000/flashcard-sets");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setUserSets(data.reverse());

      } catch (err) {
        console.error("Failed to load user data", err);
      }
    }

    loadUserData();
  }, []);
  
  return (
    <main>
      {/* Navbar */}
      <Navbar/>

      {/* Page content */}
      <div className="flex flex-col items-center gap-15 min-h-screen bg-[var(--bg)] pb-15">

        {/*Prompt Header*/}
        <div className="flex flex-col justify-center items-center gap-10 bg-[var(--accent)] h-50 w-full">
          <span className=" text-3xl">Enter Flash Card Prompt!</span>
          <form className="flex flex-row w-150 gap-1" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
              placeholder="Enter your text"
              className="flex-1 border h-10 bg-[var(--bg)] text-[var(--text-primary)] border-[var(--accent)] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-[var(--peach)]"
            />
            <button
              type="submit"
              className="border border-white rounded-md px-4 bg-[var(--answer)] text-white hover:bg-[var(--answerhover)]"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex felx-row gap-10">
        {/* Flashcard List */}
        <div className="bg-[var(--surface)] rounded-2xl">
          <div className="flex items-center justify-center h-15">
            <p className="text-center text-lg text-[var(--text-primary)]">Generated Flashcard Sets</p>
          </div>
        <AnimatedList
          items={userSets.map(set => set.title)}
          onItemSelect={(_, index) => {
            handleSelect(index)
          }}
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
        </div>  

        {/* Flashcard */}
        <div className="flex flex-col justify-center">
          <FlashCards
            card={cards.length > 0 ? cards[index] : defaultCard}
            showText={showText}
            handleClick={handleClick}
            handleNext={handleNext}
          />
        </div>
        </div>
      </div>
    </main>
  );
}

export default App;
