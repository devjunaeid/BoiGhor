import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Edit() {
  const navigate = useNavigate(); // router-dom navigation.
  const pageloc = useLocation();
  const loc = pageloc.pathname.split("/")[2]; // getting book id.

  const [book, setBook] = useState({
    id : loc,
    bookTitle: "",
    bookDesc: "",
    cover: "",
    price: null
  });

  useEffect(() => {
    const fatchBooks = async () => {
      try {
        const resp = await axios.get("http://localhost:8001/books/"+loc);
        console.log(resp.data[0].bookTitle)
        setBook({...book, bookTitle: resp.data[0].bookTitle, bookDesc: resp.data[0].bookDesc, cover: resp.data[0].cover, price: resp.data[0].price});
      } catch (error) {
        console.log(error);
      }
    };
    fatchBooks();
  }, []);

// handling form changes.
  const handleChange = (e)=>{
    setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const updateEntry = async (e) =>{
    e.preventDefault();
    try {
      await axios.put("http://localhost:8001/books/"+loc, book);
      console.log("Updated Successfully!!")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='form'>
      <span>Update {book.bookTitle}</span>
      <input type="text" placeholder='Title' defaultValue={book.bookTitle} onChange={handleChange} name='bookTitle'/>
      <input type="text" placeholder='Description' defaultValue={book.bookDesc} onChange={handleChange} name='bookDesc'/>
      <input type="number" placeholder='Price' defaultValue={book.price} onChange={handleChange} name='price'/>
      <input type="text" placeholder='Cover Image link' defaultValue={book.cover} onChange={handleChange} name='cover'/>
      <button onClick={updateEntry}>Update</button>
    </div>
  )
}

export default Edit