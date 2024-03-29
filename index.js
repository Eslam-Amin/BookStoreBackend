import express from "express";
import mongoose from 'mongoose';
import cors from "cors"

import booksRouter from "./routes/bookRouter.js";

import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type"],
}
app.use(cors(corsOptions));
app.use("/books", booksRouter);
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


app.get("*", (req, res) => {
    return res.status(404).send("Page not found!!");
})

