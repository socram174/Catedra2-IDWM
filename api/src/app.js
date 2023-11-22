import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Product from './models/Product.js'

const app = express();

app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/',(req, res) => {
    res.status(200).json({"saludo":"hola"});

});

app.get('/api/products',async (req, res) => {
    const products = await Product.find();

    res.status(200).json(products);
});

app.post('/api/products',async (req, res) => {
    
    try{
        const { name, price, description } = req.body;
        let { image } = req.body;
        console.log(name, price, description, image);



        const product = new Product({
            name,
            price,
            description,
            image
        });
    
        product.save();
    
        res.status(200).json({"succsess": true, product});
    }catch(err){
        res.send(500).json(err)
    }
});

app.delete('/api/products/:id',async (req, res) => {


    try{
        const { id } = req.params;
    
        await Product.deleteOne({_id:id});
    
    
        res.status(200).json({"success":true});
    }catch(err){
        console.log(err);
        res.status(500).json({"success":false});
    }
});

app.post('/api/products/:id',async (req, res) => {
    
    try{
        const { name, price, description } = req.body;
        let { image } = req.body;
        const { id } = req.params;
        console.log(name, price, description, image);



        const product = await Product.findById(id);

        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
    
        await product.save();
    
        res.status(200).json({"succsess": true, product});
    }catch(err){
        res.status(500).json(err)
    }
});





app.listen(3000,async () => {
    console.log("listening on: http://localhost:3000");
    await mongoose.connect("mongodb+srv://marcos:marcos@cluster0.7ynbwt5.mongodb.net/Catedra2?retryWrites=true&w=majority");
    console.log("Database connected!");
});
