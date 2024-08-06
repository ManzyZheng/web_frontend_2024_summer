// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center gap-2">
        <Link to="/home" className="text-xl font-semibold">Home </Link>
        <div className="space-x-4">
          <Link to="/circle/1" className="hover:underline">Circle </Link>
          <Link to="/profile" className="hover:underline">Profile </Link>
          <Link to="/login" className="hover:underline">Login </Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

