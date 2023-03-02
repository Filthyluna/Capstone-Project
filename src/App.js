import axios from "axios";
import React from "react";

const url = "https://gutendex.com/books/";

export default function Book() {
  let id = Math.floor(Math.random() * 12000)
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
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
    <div className="book-info">
      <h1>{book.title}</h1>
      <h2>{book.authors[0].name.split(',').reverse().join(' ')}</h2>
      <p>{book.formats[3]}</p>
    </div>
  );
}

