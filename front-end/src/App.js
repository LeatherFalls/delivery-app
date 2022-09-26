import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';
import './App.css';
import MyProvider from './context/globalProvider';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <ToastContainer />
        <AppRoutes />
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
