import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function NewEntry() {
  const [book, setBook] = useState({
    bookTitle: "",
    bookDesc: "",
    cover: "",
    price: null
  });

  const navigate = useNavigate();
  const handleChange = (e)=>{
    setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const submit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:8001/books", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(book);
  return (
    <div className='form'>
      <span>Add new book</span>
      <input type="text" placeholder='Title' onChange={handleChange} name='bookTitle'/>
      <input type="text" placeholder='Description' onChange={handleChange} name='bookDesc'/>
      <input type="number" placeholder='Price' onChange={handleChange} name='price'/>
      <input type="text" placeholder='Cover Image link' onChange={handleChange} name='cover'/>
      <button onClick={submit}>Add</button>
    </div>
  )
}

export default NewEntry