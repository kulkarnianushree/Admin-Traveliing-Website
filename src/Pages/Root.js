import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Components/Navigation/Navigation';

const Root = () => {
  return (
    <div>
      <Navigation /> 
      <Outlet />
    </div>
  );
};

export default Root;
