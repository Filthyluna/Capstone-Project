import React from 'react';
import { Link } from 'react-router-dom';
import '../App';

const navbar = () => {
  return (
    <div className='navbar'>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/booklist">Book List</Link></li>
        </ul>
    </div>
  )
}

export default navbar
