import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BookList" element={<BookList />} /> 
        <Route path="/book/:id" element={<BookDetails/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
