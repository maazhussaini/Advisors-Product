'use-client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUploadedData } from '@/lib/features/uploadedDataSlice';
import { useRouter } from 'next/navigation';

export const Upload = ({ setStep }: any) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStepState] = useState(1); // Step state: 1 for source files, 2 for mapping files
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [mappingFiles, setMappingFiles] = useState<File[]>([]);
  
const router = useRouter();
  const dispatch = useDispatch();


  const onDrop = (acceptedFiles: File[]) => {
    if (step === 1) {
      setSourceFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    } else if (step === 2) {
      setMappingFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/csv': ['.csv'],
      ...(step === 1 && { 'application/pdf': ['.pdf'] }), // PDFs only allowed for source files
    },
    multiple: true,
  });

  const handleUpload = async () => {
    if (!sourceFiles.length || !mappingFiles.length) {
      toast.error('Please upload both source and mapping files.');
      return;
    }

    const formData = new FormData();

    // Append source files
    sourceFiles.forEach((file) => formData.append('files', file));

    // Append mapping files
    mappingFiles.forEach((file) => formData.append('mapping_file', file));

    try {
      setUploading(true);

      const response = await axios.post('http://3.29.31.87/api/fileUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      if (response.status === 200) {
        toast.success('Files uploaded successfully!');
        dispatch(setUploadedData(response.data))
        
      } else {
        toast.error(`Upload failed: ${response.data?.message || response.statusText}`);
      }
    } catch (error: any) {
      console.error('Upload Error:', error);
      toast.error(`Error uploading files: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
      router.push('/table');     
    }
  };

  const removeFile = (type: 'source' | 'mapping', index: number) => {
    if (type === 'source') {
      setSourceFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else {
      setMappingFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const renderFilePreview = (files: File[], type: 'source' | 'mapping') =>
    files.map((file, index) => (
      <div
        key={index}
        className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600 mt-2"
      >
        <span>{file.name}</span>
        <button
          className="text-red-500 hover:underline"
          onClick={() => removeFile(type, index)}
        >
          Remove
        </button>
      </div>
    ));

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-md flex-col">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 grid gap-6 mb-10">
        <h2 className="text-center text-gray-900 font-semibold text-base mb-4">
          {step === 1 ? 'Upload Source Files (CSV/Excel/PDF format Only)' : 'Upload Mapping Files (CSV/Excel format Only)'}
        </h2>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 rounded-lg p-8 ${
            isDragActive ? 'border-blue-400' : 'border-dashed border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-gray-600 mt-3 flex">
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <>
              Drag & drop {step === 1 ? 'source' : 'mapping'} files here or{' '} &nbsp;
              <span className="text-blue-500 underline cursor-pointer">Browse</span>
            </>
            )}
          </div>
          <div className="text-gray-400 text-xs mt-2">
            Supported formats: {step === 1 ? 'CSV, Excel, PDF' : 'CSV, Excel'}
          </div>
        </div>

        {/* File Previews */}
        <div className="mt-4">
          <div className="text-gray-600 text-sm mb-1">Selected Files:</div>
          {renderFilePreview(step === 1 ? sourceFiles : mappingFiles, step === 1 ? 'source' : 'mapping')}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4">
          {step === 1 ? (
            <button
              className="bg-blue-500 text-white font-semibold hover:bg-blue-600 px-4 py-2 rounded-full"
              onClick={() => setStepState(2)}
              disabled={!sourceFiles.length}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white font-semibold hover:bg-blue-600 px-4 py-2 rounded-full"
              onClick={handleUpload}
              disabled={uploading || !mappingFiles.length}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
