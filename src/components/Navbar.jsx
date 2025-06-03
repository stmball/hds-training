import { Link } from "gatsby"
import * as React from "react"

const Navbar = () => {

  return (
    <nav className="bg-slate-900">
      <div className="h-16 mx-auto max-w-6xl px-4 flex align-middle justify-between text-white">
        <Link to="/" className="text-2xl font-bold self-center">
          <h1 className="text-2xl font-bold self-center">HDS Training</h1>
        </Link>
        <ul className="self-center font-thin">
          {/* Can add more routes here... */}
          <Link to="/about">About</Link>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
