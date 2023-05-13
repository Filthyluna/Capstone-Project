import React, { useState, useEffect} from 'react'
import '../App'
import { useAppContext } from './context/appContext'
import { useNavigate } from 'react-router'
import Heart from "react-heart";

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext()
  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id)
    return boolean
  }
  const navigate = useNavigate();
  const [active, setActive] = useState(() => {
    const storedFavorites = localStorage.getItem("active");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Code for heart button
  const handleActiveClick = (book) => {
    if (active.includes(book.id)) {
      setActive(active.filter(id => id !== book.id));
    } else {
      setActive([...active, book.id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("active", JSON.stringify(active));
  }, [active]);
  return (
    <div className='favorites'>
      {favorites.length > 0 ? favorites.map((book) => (
        <div key={book.id} className="books">
          <div className='favorites-button'>
            <Heart
              key={book.id}
              className="heart"
              isActive={active.includes(book.id)}
              onClick={() => {
                handleActiveClick(book);
                favoritesChecker(book.id) ? removeFromFavorites(book.id) : addToFavorites(book);
              }}
              inactiveColor="red"
              style={{ fill: active.includes(book.id) ? "red" : "white" }}
            />
          </div>
          <div><img src={book.image_url} alt='book-imgs' onClick={() => navigate(`/book/${book.id}`)} /></div>
          <h1>{book.title}</h1>
          <h2>{book.authors}</h2>
        </div>
      )) : <h1 className='no-favorites'>No favorite books yet</h1>}
    </div>
  )
}

export default Favorites