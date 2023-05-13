import { createContext, useContext } from "react";
import { useState } from "react";

const AppContext = createContext(null)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('context undefinded')
  }
  return context
}

const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

  const updateLocalStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }


  const addToFavorites = (book) => {
    const oldFavorites = [...favorites]
    const newFavorites = oldFavorites.concat(book)
    setFavorites(newFavorites)
    updateLocalStorage(newFavorites);
  }

  const removeFromFavorites = (id) => {
    const oldFavorites = [...favorites]
    const newFavorites = oldFavorites.filter((book) => book.id !== id)
    setFavorites(newFavorites)
    updateLocalStorage(newFavorites);
  }

  return (
    <AppContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider