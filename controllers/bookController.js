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

// controllers/bookController.js

// Update a book
async function updateBook(req, res) {
  console.log("uuuuuuuuupdatinnnnnnnnnnnnnnnnnngggggggg");
  try {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;
    console.log(id,title,author,publishedYear);

    // Validate if the book exists
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishedYear },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Failed to update book.");
  }
}

async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    // Check if the book exists
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.findByIdAndRemove(id);

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Failed to delete book.");
  }
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
