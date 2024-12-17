// 'use-client';

// import React, { useState, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';
// import {  toast } from 'react-toastify';

// export const Upload = ({ setStep,setFiles, files, setUploadProgress }: any) => {

//   const [uploading, setUploading] = useState(false);
  

//   // Handle file input change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
//     setFiles((prevFiles: any) => [...prevFiles, ...selectedFiles]);
//   };

//   // Handle file drop
//   const onDrop = (acceptedFiles: File[]) => {
//     setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/vnd.ms-excel': ['.xls', '.xlsx'],
//       'text/csv': ['.csv'],
//       'application/pdf': ['.pdf'],
//     },
//     multiple: true,
//   });
//   const [progress, setProgress] = useState(0);

//   // Handle upload logic
//   const handleUpload = async () => {
//     if (files.length === 0) {
//       toast.error('No files selected for upload.');
//       return;
//     }
  
//     setUploading(true);
//     const formData = new FormData();
  
//     files.forEach((file: any) => formData.append('files', file));
  
//     try {
//       const response = await fetch('http://0.0.0.0:8200/api/fileUpload', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (response.ok) {
//         toast.success('File uploaded successfully!');
//         setProgress(100);
//         setUploadProgress(100);
//         setFiles([]); // Clear files after upload
//       } else {
//         const error = await response.json();
//         toast.error(`Upload failed: ${error.message || response.statusText}`);
//       }
//     } catch (error: any) {
//       toast.error(`Error uploading files: ${error.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };
  

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileClick = (e: any) => {
//     e.prevent.default();
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="flex items-center justify-center bg-white rounded-lg shadow-md flex-col">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 grid gap-6">
//         <h2 className="text-center text-gray-900 font-semibold text-base mb-4">
//           Upload Source File (CSV/Excel/PDF format Only)
//         </h2>
//         <div
//           {...getRootProps()}
//           className={`flex flex-col items-center justify-center border-2 rounded-lg p-8 ${
//             isDragActive ? 'border-blue-400' : 'border-dashed border-gray-300'
//           }`}
//         >
//           <input {...getInputProps()} />
//           <img src="uploadIcon.svg" alt="upload" />
//           <div className="text-gray-600 mt-3 flex">
//             {isDragActive ? (
//               <p>Drop the files here...</p>
//             ) : (
//               <>
//                 Drag & drop files or <span>&nbsp;</span>
//                 <div className="text-blue-500 cursor-pointer hover:underline">
//                   <button
//                     className="text-blue-500 cursor-pointer hover:underline"
//                     onClick={(e) =>handleFileClick(e)}
//                   >
//                     Browse
//                   </button>

//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     multiple
//                     accept=".csv, .xlsx, .xls, .pdf"
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="text-gray-400 text-xs mt-2">
//             Supported formats: CSV, Excel, PDF
//           </div>
//         </div>
//         <div>
//           <div className="text-gray-600 text-sm mb-1">
//             Selected - {files.length} files
//           </div>

//           <div className="relative w-full bg-gray-200 rounded-full h-2 mt-2">
//             <div
//               className="absolute h-2 rounded-full bg-blue-500"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>

//           {files.map((file: any, index: any) => (
//             <p key={index} className="text-gray-600 text-sm mt-1">
//               {file.name}
//             </p>
//           ))}
//         </div>
//         <div className="space-y-2">
//           {files.map((file: any, index: any) => (
//             <div
//               key={index}
//               className="flex items-center justify-between border-2 border-green-400 rounded-md p-2 text-sm text-green-600"
//             >
//               <span>{file?.name}</span>
//               <img
//                 src="Delete.svg"
//                 className="w-7 h-7 cursor-pointer"
//                 alt="delete"
//                 onClick={() => setFiles(files.filter((_: any, i: any) => i !== index))}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col items-center gap-4">
//           <button
//             className="bg-white text-blue-500 font-semibold hover:bg-blue-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
//             style={{
//               width: '159px',
//               height: '35px',
//               borderRadius: '500px',
//               border: '1px solid rgba(5, 117, 230, 1)',
//             }}
//             onClick={handleUpload}
//             disabled={files.length === 0 || uploading}
//           >
//             Upload
//           </button>
//           {/* {files.length > 0 && (
//             <button
//               className="bg-white text-green-500 font-semibold hover:bg-green-50"
//               style={{
//                 width: '159px',
//                 height: '35px',
//                 borderRadius: '500px',
//                 border: '1px solid rgba(34, 197, 94, 1)',
//               }}
//             >
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 Upload More Files
//                 <input
//                   type="file"
//                   multiple
//                   accept=".csv, .xlsx, .xls, .pdf"
//                   onChange={handleFileChange}
//                   style={{ display: 'none' }}
//                   id="file-upload"
//                 />
//               </label>
//             </button>
//           )} */}
//         </div>
//       </div>
//       <div className="flex justify-center mt-6 w-full sm:justify-end pr-10">
//         <button
//           className="bg-white text-blue-500 font-semibold hover:bg-blue-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
//           style={{
//             width: '159px',
//             height: '35px',
//             borderRadius: '500px',
//             border: '1px solid rgba(5, 117, 230, 1)',
//             marginBottom: '30px',
//           }}
//           onClick={() => {setStep(2)}}
//           disabled={files.length === 0}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

'use-client';

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';


export const Upload = ({ setStep, setFiles, files, setUploadProgress }: any) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState<any>(null);


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
    e.prevent.default();
    fileInputRef.current?.click();
  };

  // Handle mapping specific files to required fields
  const mapFile = (file: File, field: string) => {
    setMappedFiles((prev: any) => ({
      ...prev,
      [field]: file,
    }));
  };

  // Handle upload logic
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
      const response = await fetch('http://localhost:8200/api/fileUpload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Files uploaded successfully!');
        const mapped_data = await response.json();
        console.log(mapped_data);
        setUploadedData(mapped_data);
        setProgress(100);
        setUploadProgress(100);
        setFiles([]);
        setMappedFiles({ files: null, mapping_file: null });
      } else {
        const error = await response.json();
        toast.error(`Upload failed: ${error.message || response.statusText}`);
      }
    } catch (error: any) {
      toast.error(`Error uploading files: ${error.message}`);
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
