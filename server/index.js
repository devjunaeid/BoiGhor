import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookStore"
})

// Setting up express to accept client files.
app.use(express.json());

// setting up cors for passing api request to the axios.
app.use(cors())


if(db) console.log("Connected");

app.get("/", (req, res) =>{
    res.json("Hello this is from backend server.");
})

// Getting data from the database.
app.get("/books", (req, res) =>{
    const query = "SELECT * FROM books;";
    db.query(query, (err, data) =>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

// geting a single book data via id.
app.get("/books/:id", (req, res) =>{
    const id = req.params.id;
    const query = "SELECT * FROM books WHERE id = ?;";
    db.query(query,[id], (err, data) =>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})


//Sending data to the Database

app.post("/books", (req, res) =>{
    const query = "INSERT INTO books (`booktitle`, `bookDesc`, `cover`, `price`) VALUES (?);";
    const values = [
        req.body.bookTitle,
        req.body.bookDesc,
        req.body.cover,
        req.body.price
    ];
    db.query(query,[values], (error, data) =>{
        if(error){
            return res.json(error);
        }else{
            return res.json("New book inserted successfully!!");
        }
    })
})

// delete a book
app.delete("/books/:id", (req, res)=>{
    const id = req.params.id;
    const query = "DELETE FROM books WHERE id = ?"
    db.query(query,[id], (error, data)=>{
        if (error) {
            return res.json(error);
        } else {
            return res.json("Book removed successfully!!!!");
        }
    })
})

// update book data
app.put("/books/:id", (req, res)=>{
    const id = req.params.id;
    const query = "UPDATE books set `bookTitle` = ?, `bookDesc` = ?, `cover` = ?, `price` = ? WHERE id = ?"
    const values = [
        req.body.bookTitle,
        req.body.bookDesc,
        req.body.cover,
        req.body.price
    ]
    db.query(query,[...values,id], (error, data)=>{
        if (error) {
            return res.json(error);
        } else {
            return res.json("Book updated successfully!!!!");
        }
    })
})

app.listen(8001, ()=>{
    console.log("Express connected with hot-reload!!");
})