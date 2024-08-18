import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './Components/Navigation/Navigation';
import LoginPage from './Pages/LoginPage';
import ProductPage from './Pages/ProductPage';
import BookingPage from './Pages/BookingPage';

const App = () => {
  const LoginStatus = useSelector((state) => state.auth.LoginStatus);

  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={!LoginStatus ? <LoginPage /> : <ProductPage />} />
          {LoginStatus && (
            <>
              <Route path='/product' element={<ProductPage />} />
              <Route path='/Book' element={<BookingPage />} /> {/* Corrected to 'BookingPage' */}
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
