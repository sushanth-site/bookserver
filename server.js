const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://heatbeatgroup:heatbeat@cluster0.ueygb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for the book details
const bookSchema = new mongoose.Schema({
    bookName: String,
    pdfUrl: String,
    pageCount: Number,
    thumbnailUrl: String,
});

const Book = mongoose.model('Book', bookSchema);

// API endpoint to get all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// API endpoint to add a new book
app.post('/api/books', async (req, res) => {
    const { bookName, pdfUrl, pageCount, thumbnailUrl } = req.body;
    const newBook = new Book({ bookName, pdfUrl, pageCount, thumbnailUrl });
    try {
        await newBook.save();
        res.status(201).send('Book added successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
