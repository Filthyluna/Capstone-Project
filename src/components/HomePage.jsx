import React, {useState, useEffect} from 'react';
import '../App';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ReactPaginate from 'react-paginate';
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
      <h1>{book.title}</h1>
      <h2>{book.authors}</h2>
    </div>
  ));

  const handlePageClick = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };

  return (
    <div>
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
      />
  </div>
  );

}

export default HomePage
