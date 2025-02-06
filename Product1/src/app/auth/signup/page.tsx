'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log('formData', formData.firstName);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Create FormData object
    const formPayload = new FormData();
    formPayload.append('user_first_name', formData.firstName);
    formPayload.append('user_last_name', formData.lastName);
    formPayload.append('user_email', formData.email);
    formPayload.append('user_password', formData.password);
    formPayload.append('user_phone', formData.phone);

    // Debugging: View the FormData contents
    for (const [key, value] of formPayload.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch('http://3.28.221.79/api/users', {
        method: 'POST',
        body: formPayload, // Sending FormData to API
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setErrorMessage('');
        toast.success('Account Created Successfully!'); // Toast message for success
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setErrorMessage(result.data.message || 'An error occurred');
        setSuccessMessage('');
        toast.error(result.data.message || 'An error occurred'); // Toast message for error
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred while submitting the form.');
      toast.error('An error occurred while submitting the form.'); // Toast message for error
    }
  };

  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#1B2A41] flex flex-col justify-center items-center text-white p-8 relative">
        <Image
          src="/mainLogo.svg"
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
      <div className="flex flex-col justify-center items-center h-[95vh] bg-gray-100 dark:bg-gray-800">

      <div className="w-[400px] bg-white dark:bg-[#2A3B55] p-6 shadow-lg rounded-lg max-h-screen overflow-y-auto no-scrollbar">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Welcome
          </h2>

          <h2 className="text-2xl text-start mb-6 text-gray-700 dark:text-gray-300">
            Sign up to get started
          </h2>

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {['firstName', 'lastName', 'userName', 'email', 'phone'].map(
              (field) => (
                <div key={field} className="relative">
                  {field === 'email' ? (
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                  ) : (
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                  )}
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400 dark:bg-[#2A3B55] dark:text-white"
                    required
                  />
                </div>
              )
            )}

            {['password', 'confirmPassword'].map((field) => (
              <div key={field} className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                <input
                  type="password"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400 dark:bg-[#2A3B55] dark:text-white"
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full border border-[#1B2A41] text-[#1B2A41] py-2 px-4 rounded-full hover:bg-[#1B2A41] hover:text-white hover:bg-opacity-90 dark:border-white dark:text-white"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-[#2A3B55] dark:border-gray-400"
              required
            />
            <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
              I hereby agree to the terms & conditions
            </label>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/auth/forgot-password"
              className="text-gray-600 hover:underline dark:text-gray-300"
            >
              Forgot password
            </Link>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
            </span>
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
</div>

      </div>
    </div>
  );
};

export default SignUpPage;


