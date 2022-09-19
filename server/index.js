import express from "express"
import connection from "./database/db.js"
import dotenv from "dotenv"
import Router from "./routes/route.js"
import cors from "cors"

dotenv.config();

const app= express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/',Router);



const PORT= 8000;

app.listen(PORT,()=>{
    console.log('connection successfull at port :',PORT);
})

const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;
connection(USERNAME,PASSWORD);
