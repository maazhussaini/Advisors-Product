'use-client';
import React from 'react';

export const Header = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center p-4">
        {/* <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 grid gap-6"> */}
        {/* Header Section */}
        <div className="w-full  flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center w-full sm:w-auto">
            <img
              src="Mask.svg"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span
              className="text-gray-800 font-semibold text-xl"
              style={{
                color: 'rgba(0, 0, 0, 1)',
                fontFamily: 'Poppins',
                fontSize: '30px',
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
            <img src="bell.svg" alt="Notifications" className="w-10 h-10" />
            <img
              src="cat.svg"
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
