const express = require('express');

const public_users = express.Router();

// Sample dataset (since /books API doesn't exist)
let books = {
    1: { "author": "Chinua Achebe", "title": "Things Fall Apart" },
    2: { "author": "Hans Christian Andersen", "title": "Fairy tales" },
    3: { "author": "Dante Alighieri", "title": "The Divine Comedy" },
    4: { "author": "Unknown", "title": "Book Four" }
};

// TASK 10 - Get all books
public_users.get('/', (req, res) => {
    res.json(books);
});

// TASK 11 - Get by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    res.json(books[req.params.isbn] || {});
});

// TASK 12 - Get by Author
public_users.get('/author/:author', (req, res) => {
    let result = {};
    Object.keys(books).forEach(key => {
        if (books[key].author === req.params.author) {
            result[key] = books[key];
        }
    });
    res.json(result);
});

// TASK 13 - Get by Title
public_users.get('/title/:title', (req, res) => {
    let result = {};
    Object.keys(books).forEach(key => {
        if (books[key].title === req.params.title) {
            result[key] = books[key];
        }
    });
    res.json(result);
});

module.exports = public_users;