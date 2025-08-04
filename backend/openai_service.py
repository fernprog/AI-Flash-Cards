from dotenv import load_dotenv
import os

from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, MetaData
from databases import Database

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
database = Database(DATABASE_URL)
metadata = MetaData()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()


origins = [
    "http://localhost:5176",  # your React frontend URL
    "http://localhost:3000",  # add any others you need
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
)  

class Input(BaseModel):
    input: str

@app.post("/run-script")
def run_script(input: Input):
    # Do something with input.text
    result = f"Hello from Python, you sent: {input.input}"
    return {"result": result}

@app.on_event("startup")
async def connect():
    await database.connect()

@app.on_event("shutdown")
async def disconnect():
    await database.disconnect()

def promptOpenAiApi():
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Helpful, concise answers (under 60 tokens)."},
            {
                "role": "user",
                "content": "Give me a common Python interview question and answer.",
            },
        ],
        max_tokens=60
    )

    response = completion.choices[0].message.content
    print(response)