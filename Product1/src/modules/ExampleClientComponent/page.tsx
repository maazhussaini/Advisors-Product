'use client';

import { useGetTheUsersQuery } from '@/lib/services/api';
import Image from 'next/image';
import React from 'react';
// import ExampleCounter from './components/Counter';
import { Header } from '@/common/components/Header';
import { Upload } from '@/common/components/Upload';
import { UploadMapping } from '@/common/components/UploadMapping';

const ExampleClientComponent = () => {
  const { data, isLoading, isError } = useGetTheUsersQuery('');
  console.log(data);

  return (
    <>
    <Header />

    <Upload />
    <UploadMapping />

    </>
  );
};

export default ExampleClientComponent;