import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import ProductPage from './Pages/ProductPage';

const App = () => {
  const LoginStatus = useSelector((state) => state.auth.LoginStatus);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={!LoginStatus ? <LoginPage /> : <ProductPage />} />
          {LoginStatus && (
            <Route path='/product' element={<ProductPage/>}/>
          )}
         
        </Routes>
      </Router>
    </div>
  );
};

export default App;
