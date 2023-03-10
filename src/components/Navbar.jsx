import React from 'react';
import { Link } from 'react-router-dom';
import '../App';

const navbar = () => {
  return (
    <div className='navbar'>
        <ul>
          <Link to="/">Home</Link>
          <br />
          <Link to="/booklist">Book List</Link>
        </ul>
    </div>
  )
}

export default navbar
