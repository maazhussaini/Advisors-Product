'use client';
import Image from 'next/image';

import React from 'react';

export const Header = () => {


const lcData = localStorage.getItem('userInfo');
const userData = JSON.parse(lcData!);

  return (
    <>
      <div className="w-full flex flex-col items-center p-4">
        <div className="w-full flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          {/* Logo and Company Name */}

          <div className="flex items-center w-full sm:w-auto">
            <Image
              src="Mask.svg"
              alt="Profile"
              className="rounded-full mr-2"

              width={40}
              height={40}
            />
            <span
              className="text-gray-800 dark:text-gray-200 font-semibold text-xl"
              style={{
                fontFamily: 'Poppins',
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '45px',
              }}
            >
              {userData.displayName}
            </span>
          </div>

          {/* Notifications and User Profile */}
          <div className="flex items-center space-x-4">
            <Image
              src="bell.svg"
              alt="Notifications"
              height={40}
              width={40}
              className="text-gray-800 dark:text-gray-200"
            />
            <Image
              src="cat.svg"
              alt="User Profile"
              className="text-gray-800 dark:text-gray-200"

              height={40}
              width={40}
            />
          </div>
        </div>
      </div>
    </>
  );
};
