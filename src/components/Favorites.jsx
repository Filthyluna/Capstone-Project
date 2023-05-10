import React from 'react'
import '../App'
import { useAppContext } from './context/appContext'
import { useNavigate } from 'react-router'

const Favorites = () => {
    const { favorites, addToFavorites, removeFromFavorites } = useAppContext()
    const favoritesChecker = (id) => {
        const boolean = favorites.some((book) => book.id === id)
        return boolean
    }
  const navigate = useNavigate();
  return (
    <div className='favorites'>
      {favorites.length > 0 ? favorites.map((book) => (
        <div key={book.id} className="books">
          <div><img src={book.image_url} alt='book-imgs' onClick={() => navigate(`/book/${book.id}`)} /></div>
          <div>
            {favoritesChecker(book.id) ? <button onClick={() => removeFromFavorites(book.id)}>Remove</button> : <button onClick={() => addToFavorites(book)}>Add to Favorites</button>}
          </div>
          <h1>{book.title}</h1>
          <h2>{book.authors}</h2>
        </div>
      )) : <h1 className='no-favorites'>No favorite books yet</h1>}
    </div>
  )
}

export default Favorites