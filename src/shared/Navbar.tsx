

import { ModeToggle } from "@/components/ui/moodToggler";
import { Link } from "react-router";


export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center gap-3 px-5 bg-amber-800 rounded-lg text-white">
      <Link to="/" className="text-xl flex">
        
      </Link>
      <Link className="hover:underline" to="/">
        Books
      </Link>
      <Link className="hover:underline" to="/users">
        Borrow Books
      </Link>
      <div className="ml-auto text-black">
        <ModeToggle />
      </div>
    </nav>
  );
}