import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center gap-8 p-6 bg-gray-400">
      <NavLink to="/" className="text-gray-800 font-semibold text-lg">
        Main Page
      </NavLink>
      <NavLink to="history" className="text-gray-800 font-semibold text-lg">
        History Page
      </NavLink>
    </header>
  );
};

export default Header;
