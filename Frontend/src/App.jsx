import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import { Toaster } from "react-hot-toast";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
     <BrowserRouter>
       <Toaster position="top-center" />
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
<div className="w-full min-h-screen flex justify-center items-start bg-gray-100">
        {/* pt-20 fixes scroll because navbar is fixed */}
        
        <div className="w-full max-w-3xl px-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
