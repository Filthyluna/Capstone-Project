import './App.css';
import React, {useState, useEffect} from "react";
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookDetails from './components/BookDetails';
import Favorites from './components/Favorites';
function App() {
  //========================== Loading Page
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  //==========================
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetails/>} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
