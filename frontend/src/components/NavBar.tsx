import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `transition duration-200 ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-[999]">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            G
          </div>

          <span className="text-2xl font-bold text-blue-600">Get-Code</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/layout/upload" className={linkStyle}>
            Upload
          </NavLink>

          <NavLink to="/profile" className={linkStyle}>
            Profile
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full md:hidden bg-white border-t  border-gray-100 shadow-md">
          <div className="flex flex-col px-5  py-4 space-y-4">
            <NavLink
              to="/"
              className={linkStyle}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/layout/upload"
              className={linkStyle}
              onClick={() => setOpen(false)}
            >
              Upload
            </NavLink>

            <NavLink
              to="/profile"
              className={linkStyle}
              onClick={() => setOpen(false)}
            >
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
