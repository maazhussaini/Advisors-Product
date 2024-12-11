'use client';

import React from 'react';

export const UploadMapping = ({ setStep, files, uploadProgress }: any) => {
  console.log('uploadProgress',uploadProgress)
  return (
    <div className="flex items-center justify-center min-h-screen bg-white rounded-lg shadow-md flex-col">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 grid gap-6">
        <h2 className="text-center text-gray-900 font-semibold text-base mb-4">
          Upload Mapping File (CSV/Excel/PDF format Only)
        </h2>

        <div className="relative w-full bg-gray-200 rounded-full h-2">
          <div
            className="absolute h-2 rounded-full bg-blue-500"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>

        <p className="text-gray-600 text-sm mb-1">
          Uploaded files - {files.length}/{files.length} files
        </p>

        {files.map((file: any, index: any) => (
          <div
            key={index}
            className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600"
          >
            <span>{file.name}</span>
            <img src="Delete.svg" className="w-7 h-7" alt="delete" />
          </div>
        ))}

        <button
          onClick={() => setStep(1)}
          className="bg-white text-blue-500 font-semibold hover:bg-blue-50"
        >
          Back
        </button>
      </div>
    </div>
  );
};
