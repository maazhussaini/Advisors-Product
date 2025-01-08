'use-client';

import React from 'react';
import Link from 'next/link'; // Import the Link component for routing
import Image from 'next/image'

export const SideNav = () => {
  return (
    <div
      className="flex flex-col h-screen bg-[#0E1B33] w-70 p-4"
      style={{ borderTopRightRadius: '50px' }}
    >
      {/* Logo Section */}
      <div className="flex items-center mb-8" style={{ paddingTop: '29px' }}>
        <Image
          src="logo.svg"
          alt="Logo"
          height={32}
          width={170}
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center bg-[#3B4D6A] rounded-[83px] p-2 mb-6 w-[234px]">
      <Image
              src="Mask.svg"
              alt="Profile"
               className="rounded-full mr-2"
              width={40}
              height={40}
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
          className="flex items-center text-white text-[18px] font-semibold leading-[26px] text-left hover:text-blue-400"
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
          className="flex items-center text-white text-[18px] font-semibold leading-[26px] text-left hover:text-blue-400"
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
        <Image
              src="Mask.svg"
              alt="Profile"
               className="rounded-full mr-2"
              width={40}
              height={40}
            />
          <div>
            <p className="text-white font-semibold">Name</p>
            <p className="text-gray-400 text-sm">xyz@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center mt-8 space-x-2 cursor-pointer">
          <Image src="setting.svg" alt="settings" 
          height={20}
          width={20}
          />
          <span className="text-white">Settings</span>
        </div>
        <div className="flex items-center mt-8 space-x-2 cursor-pointer">
          <Image src="logout.svg" alt="logout" height={20} width={20} />
          <span className="text-white">Logout</span>
        </div>
      </div>
    </div>
  );
};
