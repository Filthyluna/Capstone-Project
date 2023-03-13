import React, {useState, useEffect} from 'react';
import '../App';
import axios from 'axios';
let url = 'https://example-data.draftbit.com/books?_limit=240'

const BookList = () => {
  const [books, setBook] = useState([]);

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

  return (
    <div>
      {books.map((book) => (
        <div key={book.id} className="book">
          <div><img src={book.image_url} alt='book-img' width="300" height="400"/></div>
          <h1>{book.title}</h1>
          <h2>{book.authors}</h2>
        </div>
     ))}
    </div>
  )
}

export default BookList
