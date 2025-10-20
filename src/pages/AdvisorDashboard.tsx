import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AdvisorDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Advisor Dashboard</h1>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <p className="text-gray-700">Welcome, {user?.email}!</p>
            <p className="text-gray-700">Your role is: {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
