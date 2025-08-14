import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../src/types/supabaseclient'; 

function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if(error) {
      setMessage(error.message)
      return;
    }

    if(data) {
      setMessage("User account created!")
    }

    setEmail("");
    setPassword("");
  }

  return (
    <main>

      <div className='flex flex-col justify-center items-center min-h-screen bg-[var(--bg)]'>
      <form onSubmit={handleLogin} className='flex flex-col justify-between bg-[var(--surface)] text-[var(--text-primary)] rounded-2xl shadow-lg p-6 w-150 h-85 text-center'>
        <div className='flex flex-row justify-between text-lg'>
          <span>Sign Up Below :)</span>
          {message && <span className="text-[var(--accent)]">{message}</span>}
        </div>
        <input
          className='p-1 border rounded-sm text-md focus:outline-none focus:ring-2 focus:ring-[var(--peach)]'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email Address:"
          required> 
        </input>

        <input 
          className='p-1 border rounded-sm text-md focus:outline-none focus:ring-2 focus:ring-[var(--peach)]'          
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password:"
          required>  
        </input>

        <div className='flex justify-between'>
          <Link to="/login" className="mt-4 px-4 py-2 bg-[var(--next)] border border-white text-white text-md rounded-full hover:bg-[var(--nexthover)]"> Login! </Link>

          <button type='submit' className="mt-4 px-4 py-2 bg-[var(--answer)] border border-white text-white text-md rounded-full hover:bg-[var(--answerhover)]" >
            Submit
          </button>
        </div>

      </form>
      </div>
    </main>
  )
}

export default SignUp