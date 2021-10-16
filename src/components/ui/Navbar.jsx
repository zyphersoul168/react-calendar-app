import React from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";

import { startLogout } from "../../actions/auth";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="bg-dark-lava shadow-lg">
      <div className="max-w-10xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-4">
              <p className="py-4 px-2 text-alabaster">{name}</p>
            </div>
          </div>
          {/* <!-- Secondary Navbar items --> */}
          <div className="hidden md:flex items-center space-x-3 ">
            <button onClick={handleLogout} className="inline-flex py-2 px-2 font-bold text-alabaster bg-melon rounded transition duration-300">
              <LogoutIcon className="mt-0.5 mr-1 h-5 w-5" /> Logout
            </button>
          </div>
          {/* <!-- Mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- mobile menu --> */}
      <div className="hidden mobile-menu">
        <ul className="">
          <li className="active">
            <a
              href="index.html"
              className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
