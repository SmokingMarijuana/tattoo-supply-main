import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import products from './models/products.js';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());






// Connessione al database
mongoose.connect(
    "mongodb://localhost:27017/tattoo_supply"
)
.then (() => {

    console.log("MongoDB connesso");
    app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
})

})
.catch(err => console.log("Connessione a MongoDB fallita", err));







//PAGINA INCHIOSTRO
app.get("/api/products/ink_products", async (req, res) => {
   try {
    const inkProducts = await products.find({category: "Inchiostro"});
    res.json(inkProducts);
   } catch(err) {
    res.status(500).json({error: "Errore nel recupero dei dati"});
   }
   
});


//PAGINA MACCHINETTE
app.get("/api/products/machine_products", async (req, res) => {
   try {
    const machineProducts = await products.find({category: "Macchinette"});
    res.json(machineProducts);
   } catch(err) {
    res.status(500).json({error: "Errore nel recupero dei dati"});
   }
   
});

//GET ALL PRODUCTS (per il carrello)
app.get("/api/products/all", async (req, res) => {
   try {
    const allProducts = await products.find({});
    res.json(allProducts);
   } catch(err) {
    res.status(500).json({error: "Errore nel recupero dei dati"});
   }
});
/*

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



app.get("/api/products/machine_products", (req, res) => {
    const query = "SELECT id, title, price, brand, image FROM prodotti_macchinetta";

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({error: "Errore query database"});
        }
        res.json(results);
    });  
});


*/
