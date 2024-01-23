import express from "express";
import { Book } from '../models/bookModel.js';


const router = express.Router();
router.post("/", async (req, res) => {

    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(500).json({ message: "Missing parameters" });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            desc: req.body.desc
        };
        const book = await Book.create(newBook);
        return res.status(201).json(book)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
});

router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json(books);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
})



router.delete("/:id", async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(200).json({ message: "The Book Was Deleted Successfully" });
        } else {
            return res.status(404).json({ message: "No Book Found With This" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
})



router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear ||
            !req.body.desc

        ) {
            return res.status(500).json({ message: "Missing parameters" });
        }

        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        if (book)
            return res.status(200).json({ message: "Book Was updated Successfully!!" });
        else
            return res.status(404).json({ message: "Book was not Found!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
})




export default router; 