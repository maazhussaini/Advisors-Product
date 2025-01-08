'use-client';
import Image from 'next/image'
import React from 'react';

export const Header = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center p-4">
        {/* <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 grid gap-6"> */}
        {/* Header Section */}
        <div className="w-full  flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center w-full sm:w-auto">
            <Image
              src="Mask.svg"
              alt="Profile"
               className="rounded-full mr-2"
              width={40}
              height={40}
            />
            <span
              className="text-gray-800 font-semibold text-xl"
              style={{
                color: 'rgba(0, 0, 0, 1)',
                fontFamily: 'Poppins',
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '45px',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
            >
              Company A
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Image src="bell.svg" alt="Notifications" height={40} width={40}/>
            <Image
              src="cat.svg"
              alt="User Profile"
              className="rounded-full"
              height={40}
              width={40}
            />
          </div>
        </div>
      </div>
    </>
  );
};
