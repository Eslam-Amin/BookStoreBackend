import express from "express";
import mongoose from 'mongoose';
import cors from "cors"

import booksRouter from "./routes/bookRouter.js";

import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(express.json());



app.use("/books", booksRouter);


//Middleware for handling CORS Policy
//Option 1: Allow All Origins with default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
app.use(cors({
    origin: "https://enchanting-axolotl-565769.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}))

///app.use(cors({ origin: "http://localhost:5173/" }))

app.get("/", (req, res) => {
    return res.status(234).send("Hello WOrld!");
})

const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGO_DB_URL;
mongoose.connect(dbUrl)
    .then(() => {
        console.log("App Connected to database");

        app.listen(port, () => {
            console.log(`APP is listening to port ${port}`)
        });

    })
    .catch((err) => {
        console.log(err)
    });


