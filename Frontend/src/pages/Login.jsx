import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="max-w-md w-full bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('password')} placeholder="Password" type="password" className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
      </form>
      
<p className="text-center text-sm mt-3">
  New user? <a href="/signup" className="text-blue-600 underline">Register</a>
</p>
      </div>
    </div>
  );
}
