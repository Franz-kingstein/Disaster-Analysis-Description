import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 shadow-lg">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="text-white text-2xl font-bold tracking-wide">
        🌪️ Cyclone Tracker
      </div>

      <div className="flex items-center text-white text-lg font-semibold gap-3">
        <Link
          to="/"
          className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition-all duration-200"
        >
          Home
        </Link>
        <span>|</span>
        <Link
          to="/filter-by-year"
          className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition-all duration-200"
        >
          Cyclone Data
        </Link>
        <span>|</span>
        <Link
          to="/about"
          className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition-all duration-200"
        >
          About
        </Link>
      </div>
    </div>
  </nav>
);

export default NavBar;
