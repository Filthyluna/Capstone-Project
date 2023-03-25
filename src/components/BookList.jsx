import React, {useState, useEffect} from 'react';
import '../App';
import { useNavigate } from 'react-router';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
let url = 'https://example-data.draftbit.com/books?_limit=240'

const BookList = () => {
  const [books, setBook] = useState([]);
 const navigate = useNavigate();
  useEffect(() => {
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setBook(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  function searchBooks() {
    let input = document.getElementById('search').value //Get input from search bar
    input = input.toLowerCase(); //Convert to lowercase
    let target = document.getElementsByClassName('book'); //Get all books
    for (let i = 0; i < target.length; i++) {
      if (!target[i].innerHTML.toLowerCase().includes(input)) {
        target[i].style.display = "none";
      }
      else {
        target[i].style.display = "block"; //Show books that match search
      }
    }
  }
  function scroll () {
      window.scrollTo({top:0, left:0, behavior: 'smooth'});
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
      <h1>{book.title}</h1>
      <h2>{book.authors}</h2>
    </div>
  ));

  const handlePageClick = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };

  return (
      <div>
      <div className="search">
        <input type="text" id="search" placeholder="Search for a book or author" onKeyUp={searchBooks} />
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
        onClick  = {scroll} 
      />

      </div>
       );
}

export default BookList
