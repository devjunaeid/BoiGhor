import express from "express";
import mysql from "mysql"


const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ademtj",
    database: "bookStore"
})

app.get("/", (req, res) =>{
    res.json("Hello this is from backend server.")
})

app.listen(8001, ()=>{
    console.log("Express connected with hot-reload!!");
})