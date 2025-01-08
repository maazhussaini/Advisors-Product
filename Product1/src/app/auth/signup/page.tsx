'use-client';
import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Image from 'next/image'

const AuthPage = () => {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#1B2A41] flex flex-col justify-center items-center text-white p-8 relative">
        {/* Logo in the Top-Left Corner */}
        <Image
          src="../mainLogo.svg"
          alt="Logo"
          className="absolute top-4 left-4"
          // style={{ width: '513px', height: '114px' }}
          height={114}
          width={513}
        />

        {/* Curved SVG in Bottom-Left Corner */}
        <svg
          className="absolute bottom-0 left-0"
          width="382"
          height="200"
          viewBox="0 0 382 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M381.469 304.5C381.469 458.074 266.55 582.5 124.872 582.5C-16.8057 582.5 -131.725 458.074 -131.725 304.5C-131.725 150.926 -16.8057 26.5 124.872 26.5C266.55 26.5 381.469 150.926 381.469 304.5Z"
            stroke="#C2C2C2"
          />
          <path
            d="M306.694 278.5C306.694 432.074 191.775 556.5 50.097 556.5C-91.5807 556.5 -206.5 432.074 -206.5 278.5C-206.5 124.926 -91.5807 0.5 50.097 0.5C191.775 0.5 306.694 124.926 306.694 278.5Z"
            stroke="#C2C2C2"
          />
        </svg>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="w-[400px] bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-start mb-6">Welcome</h2>
          <h2 className="text-2xl text-start mb-6">Sign up to get started </h2>
          <form className="space-y-4">
            {/* First Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="firstName"
                placeholder="First Name"
                className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                required
              />
            </div>
            {/* Last Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="lastName"
                placeholder="Last Name"
                className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                required
              />
            </div>
            {/* UserName */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="userName"
                placeholder="User Name"
                className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                required
              />
            </div>
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                required
              />
            </div>
            {/* password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                required
              />
            </div>
            {/* Confrim passwrod */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full border border-[#1B2A41] text-[#1B2A41] py-2 px-4 rounded-full hover:bg-[#1B2A41] hover:text-white hover:bg-opacity-90"
            >
              Sign Up
            </button>
          </form>

          {/* checkbox */}

          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="remember-me"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="remember-me" className="text-gray-700">
              I hereby agree to the terms & conditions
            </label>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/auth/forgot-password"
              className="text-gray-600 hover:underline"
            >
              Forgot password
            </Link>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-600">or</span>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
