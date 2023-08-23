import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fatchBooks = async () => {
      try {
        const resp = await axios.get("http://localhost:8001/books");
        setBooks(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchBooks();
  }, []);


  const deleteBook = async (id) =>{
    try {
      await axios.delete("http://localhost:8001/books/"+id);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  return <div>
    <h1>BoiGhor</h1>
    <div className="books">
      {books.map(book=>(
        <div className="book" key={book.id}>
          {book.cover && <img src={book.cover} alt=""/>}
          <h3>{book.bookTitle}</h3>
          <p>{book.bookDesc}</p>
          <span>Price: {book.price}</span>
          <button className="delete" onClick={()=> deleteBook(book.id)}>Delete</button>
          <button className="update"><Link style={{ textDecoration: 'none', color: 'white'}} to={`/edit/${book.id}`}>Update</Link></button>
        </div>
      ))}
    </div>
    <button className="newBookBtn">
      <Link style={{ textDecoration: 'none', color: 'white'}} to="/create">Add New Books</Link>
    </button>
  </div>;
}

export default Books;
