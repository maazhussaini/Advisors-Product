import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

const ForgotPasswordPage = () => {
  return (
    <>
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
        <div className="w-1/2 bg-white dark:bg-[#1B2A41] flex flex-col justify-center items-center">
  <div className="w-full max-w-md bg-white dark:bg-[#2A3B55] rounded-lg shadow-lg p-8">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
      Forgot Your Password?
    </h2>
    <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
      Enter your email address and we’ll send you a link to reset your password.
    </p>

    <form className="space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-[#1B2A41] dark:text-white dark:placeholder-gray-400"
          placeholder="Enter your email"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800"
      >
        Send Reset Link
      </button>
    </form>

    <div className="mt-4 text-center">
      <Link
        href="/auth/login"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Back to Login
      </Link>
    </div>
  </div>
</div>

      </div>

      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden"></div> */}
    </>
  );
};

export default ForgotPasswordPage;
