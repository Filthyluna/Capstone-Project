import React from 'react';
import { Link } from 'react-router-dom';
import '../App';

const navbar = () => {
  return (
    <div className='navbar'>
      <h1>Cyclopedia</h1>
      <Link to="/favorites">Favorites</Link>
      <Link to="/">Home</Link>
    </div>
  )
}

export default navbar
