import React, {useState, useEffect} from 'react';
import '../App';
import { useParams } from 'react-router';
import axios from 'axios';
let url = 'https://example-data.draftbit.com/books/';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get(url + id)
      .then((res) => {
        console.log(res.data);
        setBook(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id]);

  return (
    <div>
      <div className="book-details">
        <h1>{book.title}</h1>
        <h2>{book.authors}</h2>
        <img src={book.image_url} alt='book-imgs' />
        <h3>Description</h3>
        <p>{book.description}</p>
        <h3>Genres</h3>
        <p>{book.genres}</p>
      </div>
    </div>
  )
}

export default BookDetails;
