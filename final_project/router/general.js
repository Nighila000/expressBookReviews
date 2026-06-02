
module.exports = public_users;;const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const BASE_URL = "http://localhost:5000/books";

// GET ALL BOOKS (helper fetch)
async function getBooks() {
    const response = await axios.get(BASE_URL);
    return response.data;
}

// TASK 10 - Get all books
public_users.get('/', async (req, res) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// TASK 11 - ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const books = await getBooks();
        const book = books[req.params.isbn];

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (err) {
        res.status(500).json({ message: "Error fetching by ISBN" });
    }
});

// TASK 12 - Author
public_users.get('/author/:author', async (req, res) => {
    try {
        const books = await getBooks();
        const filtered = Object.values(books).filter(
            b => b.author === req.params.author
        );

        if (filtered.length === 0) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json(filtered);
    } catch (err) {
        res.status(500).json({ message: "Error fetching by author" });
    }
});

// TASK 13 - Title
public_users.get('/title/:title', async (req, res) => {
    try {
        const books = await getBooks();
        const filtered = Object.values(books).filter(
            b => b.title === req.params.title
        );

        if (filtered.length === 0) {
            return res.status(404).json({ message: "Title not found" });
        }

        res.json(filtered);
    } catch (err) {
        res.status(500).json({ message: "Error fetching by title" });
    }
});

module.exports = public_users;