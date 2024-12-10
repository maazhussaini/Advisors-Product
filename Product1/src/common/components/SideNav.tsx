'use-client';

import React from 'react';
import Link from 'next/link'; // Import the Link component for routing

export const SideNav = () => {
  return (
    <div
      className="flex flex-col h-screen bg-[#0E1B33] w-64 p-4"
      style={{ borderTopRightRadius: '50px' }}
    >
      {/* Logo Section */}
      <div className="flex items-center mb-8" style={{ paddingTop: '49px' }}>
        <img
          src="logo.svg"
          alt="Logo"
          style={{ height: '38px', width: '190px' }}
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center bg-[#3B4D6A] rounded-[83px] p-2 mb-6 w-[234px]">
        <img
          src="Mask.svg"
          alt="Profile"
          className="inline-block size-6 rounded-full ring-2 ring-white mr-3"
        />
        <p
          style={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '21px',
            textAlign: 'left',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
            color: 'rgba(217, 217, 217, 0.56)',
          }}
        >
          Company A
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <hr
          style={{ background: 'rgba(217, 217, 217, 1)', marginTop: '20px' }}
        />
        <Link
          href="/table"
          className="flex items-center text-white text-[24px] font-semibold leading-[36px] text-left hover:text-blue-400"
          style={{
            fontFamily: 'Poppins',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 13h6v6H4v-6zM4 4h6v6H4V4zM13 4h6v6h-6V4zM13 13h6v6h-6v-6z"></path>
          </svg>
          Table
        </Link>
        <hr style={{ background: 'rgba(217, 217, 217, 1)' }} />

        <Link
          href="/dashboard"
          className="flex items-center text-white text-[24px] font-semibold leading-[36px] text-left hover:text-blue-400"
          style={{
            fontFamily: 'Poppins',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 13h6v6H4v-6zM4 4h6v6H4V4zM13 4h6v6h-6V4zM13 13h6v6h-6v-6z"></path>
          </svg>
          Dashboard
        </Link>
      </nav>

      {/* Footer Section */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="flex items-center mb-2 mt-3 space-x-4">
          <img
            src="Mask.svg"
            alt="Profile"
            className="w-10 h-10 rounded-full ring-2 ring-white"
          />
          <div>
            <p className="text-white font-semibold">Name</p>
            <p className="text-gray-400 text-sm">xyz@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center mt-8 space-x-2 cursor-pointer">
          <img src="setting.svg" alt="settings" />
          <span className="text-white">Settings</span>
        </div>
        <div className="flex items-center mt-8 space-x-2 cursor-pointer">
          <img src="logout.svg" alt="logout" />
          <span className="text-white">Logout</span>
        </div>
      </div>
    </div>
  );
};
