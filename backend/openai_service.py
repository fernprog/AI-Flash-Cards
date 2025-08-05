from dotenv import load_dotenv
import os
import json

from openai import OpenAI
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabaseCRUD import supabaseCRUD

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
)

user = [
    {
        "username": "fernandoruiz",
        "email":"test@gmail.com",
        "password_hash": "howdy",
    }
]

class Prompt(BaseModel):
    input: str

@app.post("/run-script")
def run_script(prompt: Prompt):
    if not prompt.input.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")
    
    flashcards = promptOpenAiApi(prompt.input)

    card_set = [
        {
            "user_id": 2,
            "title": flashcards[0].get("s", prompt.input) if flashcards else prompt.input,
            "description": prompt.input
        }
    ]

    sets_db = supabaseCRUD("flashcard_sets", {"id", "set_id"})
    set_id = sets_db.Create(card_set)[0]

    flashcards_query = []
    for card in flashcards:
        flashcards_query.append({
            "set_id": set_id,
            "question": card["q"],
            "answer": card["a"],
            "difficulty": card["d"],
            "subject": card["s"]
    })

    flashcards_db = supabaseCRUD("flashcards", {"id"})
    flashcards_db.Create(flashcards_query)

    sets_db.close()
    flashcards_db.close()
    return {"result": flashcards_query}

def promptOpenAiApi(prompt: str):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a flashcard generator. Respond ONLY with valid JSON array. "
                    "Each element must have keys 'q', 'a', 'd' (difficulty easy, medium, hard), 's' (subject). Answers max 15 words. "
                    "No extra text."
                )
            },
            {
                "role": "user",
                "content": f"Generate 5 study flashcards for this topic: {prompt.strip()}"
            }
        ],
        max_tokens=250,
        temperature=0
    )

    response = completion.choices[0].message.content

    try:
        flashcards = json.loads(response)
        print(flashcards)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON from OpenAI.")


    required_keys = {"q", "a", "d", "s"}
    for card in flashcards:
        for key in required_keys:
            card.setdefault(key, "")

    return flashcards