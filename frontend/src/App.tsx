import { useState } from "react";
import { testData } from "./data/test";
import FlashCards from "./components/FlashCards";

function App() {
  const [showText, setShowText] = useState(false);
  const [index, setIndex] = useState(0);
  const card = testData[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testData.length);
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
      <div className="min-h-screen bg-gray-100 pt-24 px-4">
        {/* Input Form */}
        <div className="max-w-md mx-auto mb-6">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
              placeholder="Enter your text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center">
          <FlashCards
            card={card}
            showText={showText}
            handleClick={handleClick}
            handleNext={handleNext}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
