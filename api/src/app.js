import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/',(req, res) => {
    res.status(200).json({"saludo":"hola"});

});



app.listen(3000,async () => {
    console.log
    await mongoose.connect("mongodb+srv://marcos:marcos@cluster0.7ynbwt5.mongodb.net/Catedra2?retryWrites=true&w=majority");
});
