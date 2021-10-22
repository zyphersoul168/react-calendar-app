import React from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";

import { startLogout } from "../../actions/auth";

export const Navbar = () => {
  // const btn = document.querySelector("button.mobile-menu-button");
  const menu = document.querySelector(".mobile-menu");

  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-10xl mx-auto px-4 py-3 ">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* <!-- Primary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-4">
              <p className="py-4 px-2 text-gray-50">Hello {name}! :)</p>
            </div>
          </div>
          {/* <!-- Secondary Navbar items --> */}
          <div className="hidden md:flex items-center space-x-3 ">
            <button
              onClick={handleLogout}
              className="inline-flex py-2 px-2 font-bold text-gray-50 bg-red-400 hover:bg-red-600 rounded transition duration-300"
            >
              <LogoutIcon className="mt-0.5 mr-1 h-5 w-5" /> Logout
            </button>
          </div>
          {/* <!-- Mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => menu.classList.toggle("hidden")}
            >
              <svg
                className=" w-6 h-6 text-gray-200 hover:text-indigo-300"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
        <ul className="pb-5">
          <li className="active">
            <p className="block text-md px-2 py-4 text-gray-50 font-semibold">
              Hello {name}! :)
            </p>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="ml-2 inline-flex p-3 font-bold text-gray-50 bg-red-400 hover:bg-red-600 rounded transition duration-300"
            >
              <LogoutIcon className="mt-0.5 mr-1 h-5 w-5" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
