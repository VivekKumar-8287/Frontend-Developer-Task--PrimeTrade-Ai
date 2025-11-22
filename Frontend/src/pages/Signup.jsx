import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signup } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      alert('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
        toast.error(err.response?.data?.message || "Signup failed");

    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('name')} placeholder="Name" className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input {...register('password')} placeholder="Password" type="password" className="w-full p-2 border rounded" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <button className="w-full p-2 bg-green-600 text-white rounded">Signup</button>
      <p className="text-center text-sm mt-3">
  Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
</p>
      </form>

    </div>
    </div>
  );
}
