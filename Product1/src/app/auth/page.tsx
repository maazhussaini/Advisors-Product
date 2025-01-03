'use-client';
import React from 'react';
import Link from 'next/link';

const AuthPage = () => {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#1B2A41] flex flex-col justify-center items-center text-white p-4 relative overflow-hidden">
        {/* Logo in the Top-Left Corner */}
        <img
          src="../mainLogo.svg"
          alt="Logo"
          className="absolute top-4 left-4"
          style={{ width: '300px', height: '100px' }}
        />

        {/* Curved Design */}
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
        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="block w-40 text-center py-2 bg-[#1B2A41] text-white rounded-full hover:bg-opacity-90"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="block w-40 text-center py-2 bg-[#1B2A41] text-white rounded-full hover:bg-opacity-90"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
