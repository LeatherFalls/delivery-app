import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginHome from './pages/LoginHome';
import Products from './pages/Products';
import SignUp from './pages/SignUp';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <LoginHome /> } />
      <Route path="/register" element={ <SignUp /> } />
      <Route path="/products" element={ <Products /> } />
    </Routes>
  );
}

export default AppRoutes;
