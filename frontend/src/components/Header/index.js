import React from "react";
import { FaList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <nav className="header-container bg-white flex justify-between items-center py-5 px-5 sm:px-14 lg:px-32 shadow-lg">
      <Link to="/">
        <div className="relative logo-container font-[pacifico] px-0 rounded-lg w-[180px] h-[40px] flex items-center">
          <div className="absolute top-1 right-0 bg-green-600 rounded-full z-10 w-[6px] h-[6px] animate-pulse"></div>
          <img
            src="https://cdn.prod.website-files.com/62ec02f98fa58f01d806f9c5/66a64a3867202356e599f4b2_logo%202-p-500.png"
            alt="logo"
            className="w-full h-full -pl-5"
          />
        </div>
      </Link>

      <div
        className="flex md:hidden text-slate-800 px-3 py-2 bg-slate-300 rounded-lg cursor-pointer shadow-lg"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <FaList />
      </div>
      {/* <div className="hidden md:flex text-white gap-4 font-[Roboto] "> 
        <NavLink
          to="/"
          className={({ isActive }) => {
            return (
              "px-2 py-0 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
              (isActive
                ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                : "text-slate-900 bg-white hover:text-red-400")
            );
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            return (
              "px-2 py-0 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
              (isActive
                ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                : "text-slate-900 bg-white hover:text-red-400")
            );
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => {
            return (
                "px-2 py-0 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
                (isActive
                  ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                  : "text-slate-900 bg-white hover:text-red-400")
              );
          }}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => {
            return (
                "px-2 py-0 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
                (isActive
                  ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                  : "text-slate-900 bg-white hover:text-red-400")
              );
          }}
        >
          Contact
        </NavLink>
      </div>*/}
    </nav>
  );
};

export default Header;
