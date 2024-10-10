import React from "react";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const SideMenubar = ({ showSidebar, setShowSidebar }) => {
  return (
    <>
      <div
        onClick={() => setShowSidebar(!showSidebar)}
        className={`fixed duration-200 ${
          showSidebar ? "visible" : "invisible"
        }  w-screen h-screen bg-[#43765411] opacity-0 disabled top-0 left-0 bottom-0 right-0 z-10`}
      ></div>
      <div
        className={`md:hidden fixed top-[80px] rounded-tr-md rounded-br-md left-0 w-[260px] bg-slate-100 min-h-screen z-50 shadow-lg ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col gap-5 h-[70px] px-5 py-5 font-normal font-[Roboto]" onClick={() => setShowSidebar(!showSidebar)}>
          <div className="cursor-pointer self-end">
            <IoClose size={28} className="text-black" />
          </div>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return (
                "px-2 py-2 pl-5 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
                (isActive
                  ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                  : "text-slate-900 bg-transparent hover:text-red-400")
              );
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return (
                "px-2 py-2 pl-5 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
                (isActive
                  ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                  : "text-slate-900 bg-transparent hover:text-red-400")
              );
            }}
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => {
              return (
                "px-2 py-2 pl-5 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
                (isActive
                  ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                  : "text-slate-900 bg-transparent hover:text-red-400")
              );
            }}
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => {
              return (
                "px-2 py-2 pl-5 rounded-lg hover:text-slate-900 hover:scale-105 transition-all duration-300 " +
                (isActive
                  ? "text-blue-700 bg-slate-300 font-medium hover:text-blue-700"
                  : "text-slate-900 bg-transparent hover:text-red-400")
              );
            }}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideMenubar;
