const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = 5000;

/* ---------------- BOOK DATABASE ---------------- */

let books = {
  "1": {
    title: "Harry Potter",
    author: "J.K Rowling",
    reviews: {}
  },
  "2": {
    title: "The Alchemist",
    author: "Paulo Coelho",
    reviews: {}
  },
  "3": {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    reviews: {}
  }
};

/* ---------------- USER DATABASE ---------------- */

let users = [];

/* ---------------- TASK 1 ---------------- */
/* Get all books */

app.get("/books", (req, res) => {
  res.json(books);
});

/* ---------------- TASK 2 ---------------- */
/* Get book by ISBN */

app.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  res.json(books[isbn]);
});

/* ---------------- TASK 3 ---------------- */
/* Get books by author */

app.get("/author/:author", (req, res) => {

  const author = req.params.author;

  const result = Object.values(books).filter(
    book => book.author === author
  );

  res.json(result);

});

/* ---------------- TASK 4 ---------------- */
/* Get books by title */

app.get("/title/:title", (req, res) => {

  const title = req.params.title;

  const result = Object.values(books).filter(
    book => book.title === title
  );

  res.json(result);

});

/* ---------------- TASK 5 ---------------- */
/* Get book reviews */

app.get("/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;

  res.json(books[isbn].reviews);

});

/* ---------------- TASK 6 ---------------- */
/* Register new user */

app.post("/register", (req, res) => {

  const { username, password } = req.body;

  const userExists = users.find(
    user => user.username === username
  );

  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  users.push({ username, password });

  res.json({ message: "User registered successfully" });

});

/* ---------------- TASK 7 ---------------- */
/* Login user */

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const validUser = users.find(
    user => user.username === username && user.password === password
  );

  if (!validUser) {
    return res.json({ message: "Invalid login" });
  }

  res.json({ message: "Login successful" });

});

/* ---------------- TASK 8 ---------------- */
/* Add / Modify book review */

app.put("/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const { username, review } = req.body;

  if (!books[isbn]) {
    return res.json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = review;

  res.json({
    message: "Review added / modified successfully",
    reviews: books[isbn].reviews
  });

});

/* ---------------- TASK 9 ---------------- */
/* Delete review */

app.delete("/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const { username } = req.body;

  if (!books[isbn]) {
    return res.json({ message: "Book not found" });
  }

  delete books[isbn].reviews[username];

  res.json({ message: "Review deleted successfully" });

});

/* ---------------- TASK 10 ---------------- */
/* Get all books using async/await */

app.get("/async/books", async (req, res) => {

  try {

    const response = await axios.get(
      "http://localhost:5000/books"
    );

    res.json(response.data);

  } catch {

    res.json({ message: "Error retrieving books" });

  }

});

/* ---------------- TASK 11 ---------------- */
/* Search by ISBN using promises */

app.get("/promise/isbn/:isbn", (req, res) => {

  const isbn = req.params.isbn;

  axios.get("http://localhost:5000/books")

    .then(response => {

      const books = response.data;

      res.json(books[isbn]);

    })

    .catch(() => {

      res.json({ message: "Error retrieving book" });

    });

});

/* ---------------- TASK 12 ---------------- */
/* Search by author */

app.get("/promise/author/:author", (req, res) => {

  const author = req.params.author;

  axios.get("http://localhost:5000/books")

    .then(response => {

      const books = Object.values(response.data);

      const result = books.filter(
        book => book.author === author
      );

      res.json(result);

    });

});

/* ---------------- TASK 13 ---------------- */
/* Search by title */

app.get("/promise/title/:title", (req, res) => {

  const title = req.params.title;

  axios.get("http://localhost:5000/books")

    .then(response => {

      const books = Object.values(response.data);

      const result = books.filter(
        book => book.title === title
      );

      res.json(result);

    });

});

/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});