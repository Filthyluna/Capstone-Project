import axios from "axios";
import React, {useEffect, useState} from "react";

const url = "https://gutendex.com/books/";

export default function App() {
  const [book, setBook] = useState(null);

  useEffect(() => {
    let id = Math.floor(Math.random() * 68819)
    axios.get(url + id)
      .then((res) => {
        console.log(res.data);
        setBook(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  if (!book) return null

  return (
    <div className="random-book">
      <h1>{book.title}</h1>
      <h2>{book.authors[0].name.split(',').reverse().join(' ')}</h2>
    </div>
  );
  
}

