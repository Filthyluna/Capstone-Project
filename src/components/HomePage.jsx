import React, {useState, useEffect} from 'react';
import '../App';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAppContext } from './context/appContext';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';
import Heart from "react-heart";
let url = 'https://example-data.draftbit.com/books/';

const HomePage = () => {
  const [book, setBook] = useState([]); //Used for random book
  const [books, setBooks] = useState([]); //Used for book list

  const navigate = useNavigate();
  let id = Math.floor(Math.random() * 240)

  function randomize() {
    axios.get(url + id)
      .then((res) => {
        console.log(res.data);
        setBook(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //Scroll for pagination 
  function scroll () {
      window.scrollTo({top:0, left:0, behavior: 'smooth'});
  }


  useEffect(() => { //Randomizer
    let id = Math.floor(Math.random() * 240 + 1)
    axios.get(url+id)
      .then((res) => {
        console.log(res.data);
        setBook(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  useEffect(() => { //Book list
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  //favorites code
  const {favorites, addToFavorites, removeFromFavorites} = useAppContext()
  const favoritesChecker = (id) => {
    const boolean = favorites.some((book)=>book.id === id)
    return boolean
  }

  //Pagination code
  const [pageNumber, setPageNumber] = useState(0);
  //books per page depends on search bar
  const booksPerPage = 40;
  const pagesVisited = pageNumber * booksPerPage; //Used to determine which books to display
  const pageCount = Math.ceil(books.length / booksPerPage); //Rounds up to nearest whole number

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

  //Maps through books array and displays the books + POPUP
  const displayBooks = books.slice(pagesVisited, pagesVisited + booksPerPage).map((book) => (
    <div key={book.id} className="book">
      <div>
      </div>
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
      <Popup trigger= {<img className="book-img" src={book.image_url} alt='book-img'/>} 
        modal nested>
        {close => (
          <div className="popup">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="book-details-popup">
              <h1>{book.title}</h1>
              <h2>{book.authors}</h2>
              <h3>Description</h3>
              <p>{book.description}</p>
              <h3>Genres</h3>
              <p>{book.genres}</p>
            </div>
          </div>
        )}
      </Popup>
      
      <h1>{book.title}</h1>
      <h2>{book.authors}</h2>
    </div>
  ));

  const handlePageClick = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };

  //cREATE FUNCTION TO SEARCH BOOKS AND DISPLAY THEM in a block
  const searchBooks = (e) => {
    const searchValue = e.target.value.toLowerCase();
    // Filter books array to only include books that match search value
    const filteredBooks = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchValue) ||
        book.authors.toLowerCase().includes(searchValue)
      );
    }
    );
    setBooks(filteredBooks);
    // Display book list if search bar is empty
    if(searchValue === ''){
      axios.get(url)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
    }
  };


  return (
    <div>
      <div className="search">
        <input type="text" id="search" placeholder="Search for a book or author" onKeyUp={searchBooks} />
      </div>
      <div className="random-book">
        <button onClick={randomize}>Randomize</button>
        <div><img src={book.image_url} alt='book-img' onClick={() => navigate(`/book/${book.id}`)} /></div>
        <h1>{book.title}</h1>
        <h2>{book.authors}</h2>
      </div>
      <h1><center>Full book library</center> </h1>
      <div className="book-list">
        {displayBooks}
      </div>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        activeClassName={"paginationActive"}
        onPageActive={scroll}
        onClick={scroll}

      />
    </div>
  );

}

export default HomePage
