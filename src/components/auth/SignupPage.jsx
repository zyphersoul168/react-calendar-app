import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { startSignup } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const SignupPage = () => {
  const dispatch = useDispatch();
  
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const {name, email, password, password2} = formValues;
  
  const handleSignup = (event) => {
    event.preventDefault();

    if(password.length < 5) {
      return Swal.fire("Error", "Password must have at least 6 chars", "error");
    }
    else if (password !== password2) {
      return Swal.fire("Error", "Password must match", "error");
    }

    dispatch(startSignup(name, email, password));
  };

  return (
    <div className="flex flex-row-reverse relative items-center left-16">
      <div className="absolute lg:-left-32 xs:-left-0 z-10 space-y-8 bg-gray-100 border border-dark-lava p-10 rounded-lg shadow-lg">
        <h1 className="text-gray-800 font-abril text-6xl">
          Sign <span className="text-purple-500">up</span>
        </h1>
        {/* <hr className="bg-dark-lava border-0 h-0.5" /> */}
        <div>
          <form onSubmit={handleSignup} className="space-y-3">
            <input
              className="block p-2 bg-gray-200 focus:outline-none placeholder-gray-400 text-gray-700 rounded-md w-full"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              className="block p-2 bg-gray-200 focus:outline-none placeholder-gray-400 text-gray-700 rounded-md w-full"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              className="block p-2 bg-gray-200 focus:outline-none placeholder-gray-400 text-gray-700 rounded-md w-full"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              className="block p-2 bg-gray-200 focus:outline-none placeholder-gray-400 text-gray-700 rounded-md w-full"
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={password2}
              onChange={handleInputChange}
            />
            <button
              className="block font-bold p-2 bg-yellow-200 hover:bg-yellow-300 text-gray-800 w-full rounded-md transition ease-in"
              type="submit"
            >
              Sign up
            </button>
          </form>
          <div className="mt-2">
            <p className="text-gray-800">
              Already have an account?{" "}
              <Link to="/auth/login">
                <span className="text-pink-400 font-bold">Log in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-0">
        <img
          className="border border-dark-lava rounded-2xl"
          src="https://cdn.pixabay.com/photo/2021/04/25/15/41/flower-6206819_960_720.jpg"
          alt="plants"
        />
      </div>
    </div>
  )
}
