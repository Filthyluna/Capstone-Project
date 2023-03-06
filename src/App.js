import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
// import BookList from './components/BookList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/booklist" element={<BookList />} /> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
