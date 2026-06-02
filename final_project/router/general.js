const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const BASE_URL = "http://localhost:5000/books";

// TASK 10 - Get all books
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching all books" });
    }
});

// TASK 11 - Get by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/isbn/${req.params.isbn}`);

        if (!response.data) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching book by ISBN" });
    }
});

// TASK 12 - Get by Author
public_users.get('/author/:author', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/author/${req.params.author}`);

        if (!response.data) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books by author" });
    }
});

// TASK 13 - Get by Title
public_users.get('/title/:title', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/title/${req.params.title}`);

        if (!response.data) {
            return res.status(404).json({ message: "Title not found" });
        }

        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books by title" });
    }
});

module.exports = public_users;