'use-client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  // Handle upload logic
  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert('Files uploaded successfully!');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white rounded-lg shadow-md flex-col">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 grid gap-6">
        <h2 className="text-center text-gray-900 font-semibold text-base mb-4">
          Upload Source File (CSV/Excel/PDF format Only)
        </h2>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 rounded-lg p-8 ${
            isDragActive ? 'border-blue-400' : 'border-dashed border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <img src="uploadIcon.svg" alt="upload" />
          <div className="text-gray-600 mt-3 flex">
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <>
                Drag & drop files or{' '}
                <span>&nbsp;</span>
                <div className="text-blue-500 cursor-pointer hover:underline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse
                    <input
                      type="file"
                      multiple
                      accept=".csv, .xlsx, .xls, .pdf"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                  </label>
                </div>
              </>
            )}
          </div>
          <div className="text-gray-400 text-xs mt-2">
            Supported formats: CSV, Excel, PDF
          </div>
        </div>
        <div>
          <div className="text-gray-600 text-sm mb-1">Selected - {files.length} files</div>
          {uploading && (
            <div className="relative w-full bg-gray-200 rounded-full h-2">
              <div className="absolute h-2 rounded-full bg-blue-500" style={{ width: '100%' }}></div>
            </div>
          )}
          {files.map((file, index) => (
            <p key={index} className="text-gray-600 text-sm mt-1">
              {file.name}
            </p>
          ))}
        </div>
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600"
            >
              <span>{file?.name}</span>
              <img
                src="Delete.svg"
                className="w-7 h-7 cursor-pointer"
                alt="delete"
                onClick={() =>
                  setFiles(files.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            className="bg-white text-blue-500 font-semibold hover:bg-blue-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            style={{
              width: '159px',
              height: '35px',
              borderRadius: '500px',
              border: '1px solid rgba(5, 117, 230, 1)',
            }}
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
          >
            Upload
          </button>
          {files.length > 0 && (
            <button
              className="bg-white text-green-500 font-semibold hover:bg-green-50"
              style={{
                width: '159px',
                height: '35px',
                borderRadius: '500px',
                border: '1px solid rgba(34, 197, 94, 1)',
              }}
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                Upload More Files
                <input
                  type="file"
                  multiple
                  accept=".csv, .xlsx, .xls, .pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
              </label>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6 w-full sm:justify-end pr-10">
        <button
          className="bg-white text-blue-500 font-semibold hover:bg-blue-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          style={{
            width: '159px',
            height: '35px',
            borderRadius: '500px',
            border: '1px solid rgba(5, 117, 230, 1)',
          }}
          onClick={() => alert('Next step!')}
          disabled={files.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};
