import React, {useState, useEffect} from 'react';
import '../App';
import axios from 'axios';
let url = 'https://example-data.draftbit.com/books/';

const HomePage = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    let id = Math.floor(Math.random() * 240)
    axios.get(url + id)
      .then((res) => {
        console.log(res.data);
        setBook(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <div className="random-book">
      <h1>{book.title}</h1>
      <div><img src={book.image_url} alt='book-img'/></div>
      <h2>{book.authors}</h2>
    </div>
  );

}

export default HomePage