import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    return true;
  }

  return (
    <main>

      <div className='flex flex-col justify-center items-center min-h-screen bg-[var(--bg)]'>
      <form onSubmit={handleLogin} className='flex flex-col justify-between bg-[var(--surface)] text-[var(--text-primary)] rounded-2xl shadow-lg p-6 w-150 h-85 text-center'>
        <div className='flex justify-start text-lg'>
        <span>Login Below :)</span>
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
          <Link to="/sign-up" className="mt-4 px-4 py-2 bg-[var(--next)] border border-white text-white text-md rounded-full hover:bg-[var(--nexthover)]"> Sign Up</Link>

          <button type='submit' className="mt-4 px-4 py-2 bg-[var(--answer)] border border-white text-white text-md rounded-full hover:bg-[var(--answerhover)]" >
            Submit
          </button>
        </div>

      </form>
      </div>
    </main>
  )
}

export default Login