'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Image from 'next/image';
import { toast } from 'react-toastify';

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('user_email', email);
    formData.append('user_password', password);
  
    try {
      const response = await fetch('http://3.28.221.79/api/login', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.data.message || 'Something went wrong');
      }
  
      toast.success('Login Successfully !')
      // Store the auth token in localStorage or cookies
      localStorage.setItem('authToken', data.data.accessToken);
      const userInfo = JSON.stringify(data.data.user)
      localStorage.setItem('userInfo', userInfo)
      // Redirect the user to the protected route or home page
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#1B2A41] flex flex-col justify-center items-center text-gray-100 p-8 relative">
        <Image
          src="../mainLogo.svg"
          alt="Logo"
          className="absolute top-4 left-4"
          height={114}
          width={513}
        />

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
  <div className="w-[400px] bg-white dark:bg-[#2A3B55] p-6 shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
      Welcome
    </h2>
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400 dark:bg-[#2A3B55] dark:text-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="relative">
        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400 dark:bg-[#2A3B55] dark:text-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full border border-[#1B2A41] text-[#1B2A41] dark:text-gray-100 py-2 px-4 rounded-full hover:bg-[#1B2A41] hover:text-white hover:bg-opacity-90"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>

    <div className="mt-4 text-center">
      <Link
        href="/auth/forgot-password"
        className="text-gray-600 dark:text-gray-300 hover:underline"
      >
        Forgot password
      </Link>
    </div>

    <div className="mt-4 text-center">
      <span className="text-gray-600 dark:text-gray-300">or</span>
    </div>

    <div className="mt-4 text-center">
      <span className="text-gray-600 dark:text-gray-300">Create your account. </span>
      <Link href="/auth/signup" className="text-blue-600 hover:underline">
        Sign up
      </Link>
    </div>
  </div>
</div>

    </div>
  );
};

export default Login;

