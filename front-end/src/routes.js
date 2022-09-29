import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import LoginHome from './pages/LoginHome';
import Products from './pages/Products';
import Orders from './pages/Orders';
import SignUp from './pages/SignUp';
import OrdersDetails from './pages/OrdersDetails';
import Seller from './pages/Seller';
import SellerDetails from './pages/SellerDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <LoginHome /> } />
      <Route path="/register" element={ <SignUp /> } />
      <Route
        path="/login/customer/products"
        element={ <Navigate to="/customer/products" /> }
      />
      <Route
        path="/register/customer/products"
        element={ <Navigate to="/customer/products" /> }
      />
      <Route path="/customer/products" element={ <Products /> } />
      <Route
        path="/customer/orders/:id"
        element={ <OrdersDetails /> }
      />
      <Route path="/customer/orders" element={ <Orders /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route
        path="/login/seller/orders"
        element={ <Navigate to="/seller/orders" /> }
      />
      <Route path="/seller/orders" element={ <Seller /> } />
      <Route
        path="/seller/orders/:id"
        element={ <SellerDetails /> }
      />
      <Route path="/admin/manage" element={ <Admin /> } />
    </Routes>
  );
}

export default AppRoutes;
