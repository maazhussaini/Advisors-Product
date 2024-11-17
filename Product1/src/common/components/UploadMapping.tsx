'use client';

import React from 'react';

export const UploadMapping = () => {
  return (
    <>
      {/* Full-screen container */}
      <div className="flex items-center justify-center min-h-screen bg-white rounded-lg shadow-md flex-col">
        {/* Upload card */}
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 grid gap-6">
          {/* Title */}
          <h2 className="text-center text-gray-900 font-semibold text-base mb-4">
            Upload Mapping File (CSV/Excel/PDF format Only)
          </h2>

          {/* Drag and Drop Box */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
            <img src="uploadIcon.svg" alt='upload' />
            <p className="text-gray-600 mt-3">
              Drag & drop files or{' '}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Browse
              </span>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Supported formats: CSV, Excel, PDF
            </p>
          </div>

          {/* Progress Bar and Uploading Status */}
          <div>
            <p className="text-gray-600 text-sm mb-1">Uploading - 3/3 files</p>
            <div className="relative w-full bg-gray-200 rounded-full h-2">
              <div className="absolute h-2 rounded-full bg-blue-500" style={{ width: '70%' }}></div>
            </div>
            <p className="text-gray-600 text-sm mt-1">your-file-here.PDF</p>
          </div>

          {/* Uploaded Files List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600">
              <span>document-name.PDF</span>
              <img src='Delete.svg' className='w-7 h-7' alt='delete'/>
            </div>
            <div className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600">
              <span>document-name.PDF</span>
              <img src='Delete.svg' className='w-7 h-7' alt='delete'/>
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-center items-center">
          <button
            className="bg-white text-blue-500 font-semibold hover:bg-blue-50"
            style={{
              width: '159px',
              height: '35px',
              borderRadius: '500px',
              border: '1px solid rgba(5, 117, 230, 1)',
            }}
          >
            Upload
          </button>
          </div>
        </div>

        {/* Next Button outside the upload section but inside the main container */}
        <div className="flex justify-center mt-6 w-full sm:justify-end pr-10">
          <button
            className="bg-white text-blue-500 font-semibold hover:bg-blue-50"
            style={{
              width: '159px',
              height: '35px',
              borderRadius: '500px',
              border: '1px solid rgba(5, 117, 230, 1)',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
