import React, {useState, useEffect} from 'react';
import '../App';
import axios from 'axios';
let url = 'https://example-data.draftbit.com/books/';

const HomePage = () => {
  const [book, setBook] = useState([]); //Used for random book
  const [books, setBooks] = useState([]); //Used for book list
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
    axios.get(url + id)
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

  return (
  <div>
      <div className="random-book">

        <div><img src={book.image_url} alt='book-img' width="300" height="400"/></div>
        <h1><a href="https://example-data.draftbit.com/books/">{book.title}</a></h1>
        <h2><a href="https://example-data.draftbit.com/authors/">{book.authors}</a></h2>
        <button onClick={randomize}>Randomize</button>
      </div>
      
      <div>
        {books.map((book) => (
          <div key={book.id} className="book">
            <div><img src={book.image_url} alt='book-img' width="300" height="400"/></div>
            <h1><a href="https://example-data.draftbit.com/books/">{book.title}</a></h1>
            <h2><a href="https://example-data.draftbit.com/authors/">{book.authors}</a></h2>
          </div>
        ))}
      </div>
    </div>
  );

}

export default HomePage