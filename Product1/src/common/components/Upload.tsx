'use-client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUploadedData, clearUploadedData } from '@/lib/features/uploadedDataSlice';

export const Upload = ({ setStep }: any) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStepState] = useState(1); // Step state: 1 for source file, 2 for mapping file
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [mappingFile, setMappingFile] = useState<File | null>(null);

  const dispatch = useDispatch();

  const onDrop = (acceptedFiles: File[]) => {
    if (step === 1) {
      setSourceFile(acceptedFiles[0]); // Allow only one file for source
    } else if (step === 2) {
      setMappingFile(acceptedFiles[0]); // Allow only one file for mapping
    }
  };

  const { getRootProps: getSourceRootProps, getInputProps: getSourceInputProps, isDragActive: isSourceDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const { getRootProps: getMappingRootProps, getInputProps: getMappingInputProps, isDragActive: isMappingDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/csv': ['.csv'],
    },
    multiple: false,
  });


  
  const handleUpload = async () => {
    if (!sourceFile || !mappingFile) {
      toast.error('Please upload both source and mapping files.');
      return;
    }
  
    const formData = new FormData();
  
    // Append the files with the correct keys as expected by the backend
    formData.append('files', sourceFile); // Note the key 'files' here
    formData.append('mapping_file', mappingFile); // Key 'mapping_file'
  
    // Log the FormData to verify it is appended correctly
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
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
        dispatch(setUploadedData(response.data));
      } else {
        toast.error(`Upload failed: ${response.data?.message || response.statusText}`);
      }
    } catch (error: any) {
      console.error('Upload Error:', error);
      toast.error(`Error uploading files: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };
  
  
  
  

  const removeFile = (type: 'source' | 'mapping') => {
    if (type === 'source') {
      setSourceFile(null);
    } else {
      setMappingFile(null);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-md flex-col">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 grid gap-6 mb-10">
        <h2 className="text-center text-gray-900 font-semibold text-base mb-4">
          {step === 1 ? 'Upload Source File (CSV/Excel/PDF format Only)' : 'Upload Mapping File (CSV/Excel format Only)'}
        </h2>

        {/* Source File Dropzone */}
        {step === 1 && (
          <div
            {...getSourceRootProps()}
            className={`flex flex-col items-center justify-center border-2 rounded-lg p-8 ${
              isSourceDragActive ? 'border-blue-400' : 'border-dashed border-gray-300'
            }`}
          >
            <input {...getSourceInputProps()} />
            <div className="text-gray-600 mt-3 flex">
              {isSourceDragActive ? (
                <p>Drop the file here...</p>
              ) : (
                'Drag & drop source file here or click to select file'
              )}
            </div>
            <div className="text-gray-400 text-xs mt-2">
              Supported formats: CSV, Excel, PDF
            </div>
          </div>
        )}

        {/* Mapping File Dropzone */}
        {step === 2 && (
          <div
            {...getMappingRootProps()}
            className={`flex flex-col items-center justify-center border-2 rounded-lg p-8 ${
              isMappingDragActive ? 'border-blue-400' : 'border-dashed border-gray-300'
            }`}
          >
            <input {...getMappingInputProps()} />
            <div className="text-gray-600 mt-3 flex">
              {isMappingDragActive ? (
                <p>Drop the file here...</p>
              ) : (
                'Drag & drop mapping file here or click to select file'
              )}
            </div>
            <div className="text-gray-400 text-xs mt-2">
              Supported formats: CSV, Excel
            </div>
          </div>
        )}

        {/* File Preview */}
        <div className="mt-4">
          <div className="text-gray-600 text-sm mb-1">Selected File:</div>
          {(step === 1 && sourceFile) || (step === 2 && mappingFile) ? (
            <div
              className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600"
            >
              <span>{step === 1 ? sourceFile?.name : mappingFile?.name}</span>
              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFile(step === 1 ? 'source' : 'mapping')}
              >
                Remove
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-4">
          {step === 1 ? (
            <button
              className="bg-blue-500 text-white font-semibold hover:bg-blue-600 px-4 py-2 rounded-full"
              onClick={() => setStepState(2)}
              disabled={!sourceFile}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white font-semibold hover:bg-blue-600 px-4 py-2 rounded-full"
              onClick={handleUpload}
              disabled={uploading || !mappingFile}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
