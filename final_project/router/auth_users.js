
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

const regd_users = express.Router();

// IMPORTANT: must be object, not array
let users = {};

// ================= VALID USER CHECK =================
const isValid = (username) => {
  return typeof username === 'string' && username.length > 0;
};

// ================= AUTH CHECK =================
const authenticatedUser = (username, password) => {
  return users[username] && users[username] === password;
};

// ================= REGISTER =================
regd_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!isValid(username) || !password) {
    return res.status(400).json({ message: "Invalid input" });
  }

  if (users[username]) {
    return res.status(400).json({ message: "User already exists" });
  }

  users[username] = password;

  return res.json({ message: "Successfully registered" });
});

// ================= LOGIN =================
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid login" });
  }

  let token = jwt.sign({ username }, "access", { expiresIn: 3600 });

  req.session.authorization = {
    accessToken: token,
    username: username
  };

  return res.json({
    message: "User successfully logged in",
    token
  });
});

// ================= ADD / MODIFY REVIEW =================
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = review;

  return res.json({
    message: "Review successfully added/modified",
    reviews: books[isbn].reviews
  });
});

// ================= DELETE REVIEW =================
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];

    return res.json({
      message: "Review deleted",
      reviews: books[isbn].reviews
    });
  }

  return res.status(404).json({ message: "Review not found" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;