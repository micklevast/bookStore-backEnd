const Book = require("../models/Book");

async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching books");
  }
}

async function addBook(req, res) {
  const newBook = new Book(req.body);
  
  try {
    const book = await newBook.save();
    console.log("New book added!");
    res.json(book);
  } catch (error) {
    res.status(400).send("Adding new book failed");
  }
}

module.exports = {
  getBooks,
  addBook
};
