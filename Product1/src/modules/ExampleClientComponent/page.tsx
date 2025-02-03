'use client';
/* eslint-disable */
import { useGetTheUsersQuery } from '@/lib/services/api';
import React, { useState } from 'react';
import { Header } from '@/common/components/Header';
import { Upload } from '@/common/components/Upload';
import { UploadMapping } from '@/common/components/UploadMapping';
import { Table } from '@/common/components/Table';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExampleClientComponent = () => {
  const { data } = useGetTheUsersQuery('');

  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  console.log(data);

  return (
    <>
      <Header />
      {step === 1 && (
        <Upload
          setStep={setStep}
          setFiles={setFiles}
          setUploadProgress={setUploadProgress}
          files={files}
          uploadProgress={uploadProgress}
        />
      )}
      {step === 2 && (
        <UploadMapping
          setStep={setStep}
          files={files}
          uploadProgress={uploadProgress}
        />
      )}

<ToastContainer />

      {/* <Table /> */}
    </>
  );
};

export default ExampleClientComponent;
