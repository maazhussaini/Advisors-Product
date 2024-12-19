'use-client';

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUploadedData, clearUploadedData } from '@/lib/features/uploadedDataSlice';


export const Upload = ({ setStep, setFiles, files, setUploadProgress }: any) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [uploadedData, setUploadedData] = useState<any>(null);



  const dispatch = useDispatch();


  const [mappedFiles, setMappedFiles] = useState<any>({
    files: null,
    mapping_file: null,
  });

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles: any) => [...prevFiles, ...selectedFiles]);
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = (e: any) => {
    e?.prevent?.default();
    fileInputRef?.current?.click();
  };

  // Handle mapping specific files to required fields
  const mapFile = (file: File, field: string) => {
    setMappedFiles((prev: any) => ({
      ...prev,
      [field]: file,
    }));
  };



  const handleUpload = async () => {
  if (!mappedFiles.files || !mappedFiles.mapping_file) {
    toast.error('Please select files for both "files" and "mapping_file".');
    return;
  }

  setUploading(true);
  const formData = new FormData();
  formData.append('files', mappedFiles.files);
  formData.append('mapping_file', mappedFiles.mapping_file);

  try {
    const response = await axios.post(
      'http://localhost:8200/api/fileUpload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
          setUploadProgress(percentCompleted);
        },
      }
    );

    console.log('Axios Response:', response.data);

    if (response.status === 200) {
      toast.success('Files uploaded successfully!');
      // setUploadedData(response.data);

      dispatch(setUploadedData(response.data));

      setProgress(100);
      setUploadProgress(100);
      setFiles([]);
      setMappedFiles({ files: null, mapping_file: null });
    } else {
      toast.error(
        `Upload failed: ${response.data?.message || response.statusText}`
      );
        dispatch(clearUploadedData());
    }
  } catch (error: any) {
    toast.error(
      `Error uploading files: ${error.response?.data?.message || error.message}`
    );
    console.error('Upload Error:', error);
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-md flex-col">
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
                <div className="text-blue-500 cursor-pointer hover:underline">
                  <button
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={(e) => handleFileClick(e)}
                  >
                    Browse
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".csv, .xlsx, .xls, .pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="text-gray-400 text-xs mt-2">
            Supported formats: CSV, Excel, PDF
          </div>
        </div>
        <div>
          <div className="text-gray-600 text-sm mb-1">Selected Files</div>
          {files.map((file: File, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600"
            >
              <span>{file.name}</span>
              <select
                className="border rounded-md p-1 text-sm"
                onChange={(e) => mapFile(file, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Map to field...
                </option>
                <option value="files">Source File</option>
                <option value="mapping_file">Mapping File</option>
              </select>
              <img
                src="Delete.svg"
                className="w-7 h-7 cursor-pointer"
                alt="delete"
                onClick={() => setFiles(files.filter((_: any, i: number) => i !== index))}
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
            disabled={uploading || !mappedFiles.files || !mappedFiles.mapping_file}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
