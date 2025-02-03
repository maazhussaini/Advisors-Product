'use client';
import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    // Check for auth token in localStorage
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // Redirect to login page if no token found
      router.push('/auth/login');
    } else {
      // Token exists, allow access to protected route
      setLoading(false);
    }
  }, [router]);

  // Show a loading indicator while checking the token
  if (loading) return <div/>;

  return children;
};

export default ProtectedRoute;
