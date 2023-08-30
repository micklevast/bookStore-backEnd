const express = require("express");
const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.send("Working fine, thank you.");
});

// Set cookie route
router.get("/set-cookie", (req, res) => {
  // ... Cookie route logic ...
  const randomValue = Math.random().toString(); // Generate a random value for the cookie

  // Set cookies with secure:false for development over HTTP
  res.cookie('randomCookie', randomValue, { httpOnly: true, sameSite: 'strict', secure: false });
  res.send("cookies set success")
});

// User signup route
router.post("/signup", authController.signup);

// User signin route
router.post("/signin", authController.signin);

// Get books route
router.get("/books", bookController.getBooks);

// Add new book route
// router.post("/books/add", verifyToken, bookController.addBook);
router.post("/books/add", bookController.addBook);

// Update a book
router.put("/books/update/:id", bookController.updateBook);


// delete a book
router.delete("/books/delete/:id", bookController.deleteBook);

module.exports = router;
