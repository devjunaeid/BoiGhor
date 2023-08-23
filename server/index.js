import express from "express";
import mysql from "mysql"


const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ademtj",
    database: "bookStore"
})

// Setting up express to accept client files.
app.use(express.json());

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


//Sending data to the Database

app.post("/books", (req, res) =>{
    const query = "INSERT INTO books (`booktitle`, `bookDesc`, `cover`) VALUES (?);";
    const values = [
        req.body.bookTitle,
        req.body.bookDesc,
        req.body.cover
    ];
    db.query(query,[values], (error, data) =>{
        if(error){
            return res.json(error);
        }else{
            return res.json("New book inserted successfully!!");
        }
    })
})

app.listen(8001, ()=>{
    console.log("Express connected with hot-reload!!");
})