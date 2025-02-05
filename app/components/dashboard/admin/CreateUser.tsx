"use client"

import { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateUser() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Redirect if user is not admin
    if (session && session.user && session.user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if user is admin
    if (!session?.user || session.user.role !== 'admin') {
      setError('Unauthorized: Only admins can create new users');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create user');
      }

      setSuccess('User created successfully');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  // If not logged in or not admin, show unauthorized message
  if (!session || !session.user || session.user.role !== 'admin') {
    return (
      <Box className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <Alert severity="error">Unauthorized: Only admins can access this page</Alert>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Create New User</h2>
      
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">{success}</Alert>}

      <div className="space-y-4">
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="dark:bg-slate-700"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="dark:bg-slate-700"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="dark:bg-slate-700"
        />

        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="dark:bg-slate-700"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          Create User
        </Button>
      </div>
    </Box>
  );
}
