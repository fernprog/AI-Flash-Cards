## 📋 Task Board: FLASHCARD_PRJ

---

### 🟡 To Do

- [x] Define app features & flow
- [x] Choose Flask or FastAPI for backend
- [ ] Set up GitHub repo & project structure
- [ ] Set up `.env` for API keys (OpenAI, Supabase)

---

### 🛠 Backend (Python)

- [ ] Initialize Flask/FastAPI app
- [ ] Create `/generate` POST route for OpenAI
- [ ] Create `/flashcards` GET route (retrieve by prompt)
- [ ] Integrate OpenAI API for flashcard generation
- [ ] Add error handling & validation
- [ ] Test with dummy frontend calls

---

### 🖼 Frontend (React)

- [ ] Set up React app (Vite or CRA)
- [ ] Create UI: prompt input + submit button
- [ ] Add flashcard display (front/back flip)
- [ ] Connect to backend `/generate` route
- [ ] Handle loading, errors, retry UI
- [ ] Add scoring or tracking for correct/wrong

---

### 🗃 Database (Supabase PostgreSQL)

- [ ] Design schema: prompts table + flashcards table
- [ ] Set up Supabase project + API keys
- [ ] Create DB client in backend
- [ ] Save new prompt + cards after generation
- [ ] Query cards from existing prompt

---

### 📦 Deployment & DevOps

- [ ] Add Dockerfile for backend
- [ ] Dockerize React + Flask for full-stack deploy
- [ ] Deploy backend (Render/Fly.io)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Add CORS config
- [ ] Test live version end-to-end

---

### ✅ Done

_(Move completed tasks here!)_



## ⚙️ Tech Stack Summary

| Layer      | Tech                      | Purpose                                  |
|------------|---------------------------|-------------------------------------------|
| Frontend   | **React**                 | UI components, flashcard interactions     |
| Backend    | **Flask** or **FastAPI**  | API routes, OpenAI integration            |
| AI API     | **OpenAI API**            | Generate flashcards from user prompts     |
| Database   | **Supabase (PostgreSQL)** | Store prompts and flashcards              |
| Hosting    | **Vercel / Render / Fly.io** | Host frontend and backend              |
| DevOps     | **Docker**                | Containerize backend for deployment       |
| Versioning | **Git + GitHub**          | Source control, project tracking          |


### NOTES:
To download/setup python venv and reqs:
    python -m venv
    pip install -r requirements.txt
    a. to update reqs:
    pip list > requirements.txt

To setup JS packages:
    Use package.json and package-lock.json to track dependencies and run npm install to recreate.

Setup for frontend using React
    npm create vite@latest frontend -- --template react-ts
    cd frontend
    npm install
    npm run dev

    Video to install tailwind: 
    https://www.youtube.com/watch?v=WqVM0W2Hb5A
    npm install tailwindcss @tailwindcss/vite

    Icons:
    npm i lucide-react

What is?
    React
    Vite
    Docker
    Fastapi