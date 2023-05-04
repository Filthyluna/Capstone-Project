import React, {useState, useEffect} from 'react';
import '../App';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ReactPaginate from 'react-paginate';
import { useAppContext } from './context/appContext';
let url = 'https://example-data.draftbit.com/books/';

const HomePage = () => {
  const [book, setBook] = useState([]); //Used for random book
  const [books, setBooks] = useState([]); //Used for book list
  
  const navigate = useNavigate();
  let id = Math.floor(Math.random() * 240)

  //Randomizer button code
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

  useEffect(() => { //Randomizer for page load
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
  const {favorites,addToFavorites,removeFromFavorites} = useAppContext()
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
  //Maps through books array and displays the books
  const displayBooks = books.slice(pagesVisited, pagesVisited + booksPerPage).map((book) => (
    <div key={book.id} className="book">
      <div><img src={book.image_url} alt='book-img' onClick={() => navigate(`/book/${book.id}`)} /></div>
      <div>
        {favoritesChecker(book.id) ? <button onClick={()=> removeFromFavorites(book.id)}>Remove from Favorites</button> : <button onClick={()=>addToFavorites(book)}>Add to Favorites</button>}
      </div>
      <h1>{book.title}</h1>
      <h2>{book.authors}</h2>
    </div>
  ));

  const handlePageClick = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };

  //Smooth scroll when changing pages
  function scroll () {
    window.scrollTo({top:0, left:0, behavior: 'smooth'});
}


  function searchBooks() {
    //Search books and remove pagination
    let search = document.getElementById('search').value;
    let filteredBooks = books.filter((book) => {
      return book.title.toLowerCase().includes(search.toLowerCase()) || book.authors.toLowerCase().includes(search.toLowerCase());
    }
    );
    setBooks(filteredBooks);
    setPageNumber(0);

    //Backspace to reset books and pagination
    if (search === '') {
      axios.get(url)
        .then((res) => {
          console.log(res.data);
          setBooks(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <div>
      <div className="search">
        <input type="text" id="search" placeholder="Search for a book or author" onKeyUp={searchBooks} />
      </div>
      <div className="random-book">
        <div><img src={book.image_url} alt='book-img' onClick={() => navigate(`/book/${book.id}`)} /></div>
        <h1>{book.title}</h1>
        <h2>{book.authors}</h2>
        <button onClick={randomize}>Randomize</button>
      </div>

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
        onPageActive = {scroll}
        onClick = {scroll} 

      />
  </div>
  );

}

export default HomePage
