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
  const [setLoading] = useState(true);
  const spinner = document.getElementById('spinner');
  if(spinner){
    setTimeout(()=>{
      spinner.style.display="none";
      setLoading(false);
    }, 1000);
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
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
