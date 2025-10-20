import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './src/contexts/AuthContext';
import Login from './src/pages/Login';
import AdminDashboard from './src/pages/AdminDashboard';
import AdvisorDashboard from './src/pages/AdvisorDashboard';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/advisor-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['advisor']}>
            <AdvisorDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<div>Not authorized</div>} />
      <Route 
        path="/" 
        element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Navigate to="/advisor-dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
