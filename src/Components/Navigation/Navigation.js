import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const LoginStatus = useSelector(state => state.auth.LoginStatus);

  return (
    <div>
      <ul>
        {!LoginStatus && (
          <li>
            <NavLink to='/'>Login</NavLink>
          </li>
        )}
      </ul>
      <ul>
        {LoginStatus && (
          <li>
            <NavLink to='/product'>Product</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
