import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


//Connessione all'istanza
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tattoo_store"
})

db.getConnection((err, conn) => {
    if (err) {
        console.log("Errore connessione database", err);
    } else {
        console.log("Connesso al database MySQL");
        conn.release();
    }
});



app.get("/api/products", (req, res) => {
    const query = "SELECT name AS nome, brand, price AS prezzo FROM products";

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({error: "Errore query database"});
        }
        res.json(results);
    });  
});

app.get("/api/products/categories/category", (req, res) => {
    const query = "SELECT name AS nome, brand, price AS prezzo FROM products";

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({error: "Errore query database"});
        }
        res.json(results);
    });  
});

app.get("/api/products/category/:id", (req, res) => {
    const categoryId = req.params.id;
    const query = "SELECT name AS nome, brand, price AS prezzo FROM products WHERE category_id=?"


       db.query(query, [categoryId], (err, results) => {
        if(err) {
            return res.status(500).json({error: "Errore query database"});
        }
        res.json(results);
    });
})


app.get("/api/products/ink_products", (req, res) => {
    const query = "SELECT id, title, price, brand, color, image FROM prodotti_inchiostro";

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({error: "Errore query database"});
        }
        res.json(results);
    });  
});





//Avvio server backend
app.listen(5000, () => console.log("Backend API running on port 5000"));
