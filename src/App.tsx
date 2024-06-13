import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout, Layout } from './Components/Layout';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
   <Routes>
    <Route path="/" element={<AuthLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path='/auth' element={<AuthPage />} />
      </Route>
   </Routes>
  );
}

export default App;
