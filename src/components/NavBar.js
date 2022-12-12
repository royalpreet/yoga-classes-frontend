import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css';

import { useAuth } from '../hooks/useAuth';

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <div className='nav_bar'>
      <div className='nav_links'>
      <h1 className='text-center text-light'>Yoga classes</h1>
        {user ? (
          <button onClick={() => logout()}>LogOut</button>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}
