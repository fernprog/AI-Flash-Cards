import { Link } from 'react-router-dom';

export default function Navbar() {
    return(
      <nav className="bg-[var(--bg)] shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start items-center gap-2">
            <img src="public/FlipIQ_logo_2.png" alt="Flash Cards logo" className="w-25" />
            <span className="text-xl font-bold"></span>
          </div>

          {/* Center: Links */}
          <div className="flex-1 flex justify-center gap-6">
            <Link to="/login" className="text-[var(--text-primary)] hover:text-[var(--nexthover)]" > A </Link>
            <Link to="/login" className="text-[var(--text-primary)] hover:text-[var(--nexthover)]" > B </Link>
            <Link to="/login" className="text-[var(--text-primary)] hover:text-[var(--nexthover)]" > C </Link>
          </div>

          {/* Right: Button */}
          <div className="flex-1 flex justify-end">
            <button className="bg-[var(--darkerpeach)] border rounded-full text-white px-4 py-2 hover:bg-[var(--darkpeach)]">
              Sign In
            </button>
          </div>
        </div>
      </nav>
    )
}