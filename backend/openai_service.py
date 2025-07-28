from dotenv import load_dotenv
import os

from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

def promptOpenAiApi():
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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