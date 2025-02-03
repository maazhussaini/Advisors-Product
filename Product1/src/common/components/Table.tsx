'use client';

import React from 'react';
import Image from 'next/image'

export const Table = () => {
  return (
  <>
        <div className="bg-white w-full mt-14">
        <div className="w-[95%]  bg-white shadow-md rounded-md min-h-screen flex flex-col">
        {/* Table Section */}
        <div className="flex-grow overflow-x-auto">
          <table className="w-[95%] -collapse -gray-300 text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 -b -gray-300">
                  <input type="checkbox" className="form-checkbox text-blue-500" />
                </th>
                <th className="px-4 py-2 -b -gray-300">Month</th>
                <th className="px-4 py-2 -b -gray-300">Revenue</th>
                <th className="px-4 py-2 -b -gray-300">Expense</th>
                <th className="px-4 py-2 -b -gray-300">Profit</th>
                <th className="px-4 py-2 -b -gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-100">
                <td className="px-4 py-2 -b -gray-300">
                  <input type="checkbox" className="form-checkbox text-blue-500" />
                </td>
                <td className="px-4 py-2 -b -gray-300"></td>
                <td className="px-4 py-2 -b -gray-300">$000</td>
                <td className="px-4 py-2 -b -gray-300">$000</td>
                <td className="px-4 py-2 -b -gray-300">$000</td>
                <td className="px-4 py-2 -b -gray-300 text-center">
                  <button className="text-gray-500 hover:text-blue-500 flex justify-center items-center">
                    ✏️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Button Section */}
        <div className="flex justify-end gap-4 p-4">
          <button className="px-6 py-2 -blue-500 text-blue-500 rounded-full hover:bg-blue-50">
            Approve
          </button>
          <button className="px-6 py-2 -blue-500 text-blue-500 rounded-full hover:bg-blue-50">
            Edit
          </button>
          <button className="px-6 py-2 -blue-500 text-blue-500 rounded-full hover:bg-blue-50">
            Back
          </button>
        </div>
      </div>
    </div>

      <div className="flex items-center justify-between bg-white p-4 rounded shadow mt-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Settings Icon */}
          <button className="p-2 rounded hover:bg-gray-100">
            <Image src="Tool.svg"  alt=''height={20} width={20}/>
          </button>

          {/* Search Bar */}
          <div className="relative border-l">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 text-gray-600 focus:ring-blue-500 focus -blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 17a6 6 0 100-12 6 6 0 000 12zm0 0l4 4"
              />
            </svg>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 text-gray-600">
          {/* Pagination Info */}
          <span className="text-sm">1 - 10 of 52</span>

          {/* Pagination Arrows */}
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Action Icons */}
          <button className="p-2 rounded hover:bg-gray-100">
          <Image src="funnel.svg" alt='funnel' height={20} width={20}/>
          </button>

          <button className="p-2 rounded hover:bg-gray-100">
          <Image src="print.svg" alt='funnel' height={20} width={20}/>
          </button>

          <button className="p-2 rounded hover:bg-gray-100">
          <Image src="Expand.svg" alt='funnel' height={20} width={20}/>
          </button>
        </div>
      </div>

   
      </>
  );
};
