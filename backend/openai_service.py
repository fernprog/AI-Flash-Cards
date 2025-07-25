from dotenv import load_dotenv
import os

from openai import OpenAI

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

