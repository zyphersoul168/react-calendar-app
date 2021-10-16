import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { email, password } = formValues;

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(startLogin(email, password));
  }

  return (
    <div className="flex relative items-center right-16">
      <div className="absolute -right-32 z-10 space-y-8 bg-gray-100 border border-dark-lava p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-dark-lava font-abril text-6xl">
          Log <span className="text-melon">in</span>
        </h1>
        {/* <hr className="bg-dark-lava border-0 h-0.5" /> */}
        <div>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              className="block p-2 bg-gray-200 focus:outline-none placeholder-middle-gray text-dark-lava rounded-md w-full"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              className="block p-2 bg-gray-200 focus:outline-none placeholder-middle-gray text-dark-lava rounded-md w-full"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
            />
            <button
              className="block font-bold p-2 bg-melon text-dark-lava rounded-md w-full"
              type="submit"
            >
              Log In
            </button>
          </form>
          <div className="mt-2">
            <p className="text-dark-lava">
              Don't have an account?{" "}
              <Link to="/auth/signup">
                <span className="text-melon font-bold">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-0">
        <img
          className="border border-dark-lava rounded-2xl"
          src="https://cdn.pixabay.com/photo/2021/07/25/16/13/plants-6492284_960_720.jpg"
          alt="plants"
        />
      </div>
    </div>
  );
};
