const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here - done 
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});


// Task 10 - Get the book list available in the shop - using Promises and Callbacks
public_users.get('/', (req, res) => {
    getBooks()
      .then(booksList => res.json(booksList))
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      });
  });
  
  function getBooks() {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous process
      process.nextTick(() => {
        try {
          const booksList = Object.values(books);
          resolve(booksList);
        } catch (error) {
          reject(error);
        }
      });
    });
  }



// Task 11 - Get book details based on ISBN - using Promises and Callbacks 
public_users.get('/isbn/:isbn', (req, res) => {
    const myIsbn = req.params.isbn;
    
    getBookDetails(myIsbn)
      .then(book => {
        if (book) {
          res.json(book);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      });
  });
  
  function getBookDetails(key) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        try {
          const book = books[key];
          resolve(book);
        } catch (error) {
          reject(error);
        }
      });
    });
  }


// Task 12 - Get book details based on author - using Promises and Callbacks   
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;
  
    getBookDetailsByAuthor(author, (error, book) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    });
  });
  
  function getBookDetailsByAuthor(author, callback) {
    process.nextTick(() => {
      try {
        const book = Object.values(books).find(book => book.author === author);
        callback(null, book);
      } catch (error) {
        callback(error, null);
      }
    });
  }


// Task 13 - Get book details based on title - using Promises and Callbacks  
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;
  
    getBookDetailsByTitle(title, (error, book) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    });
  });
  
  function getBookDetailsByTitle(title, callback) {
    process.nextTick(() => {
      try {
        const book = Object.values(books).find(book => book.title === title);
        callback(null, book);
      } catch (error) {
        callback(error, null);
      }
    });
  }

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here - done 
  const ISBN = parseInt(req.params.isbn) - 1;
  let bookDetails3 = Object.values(books)
  the_review = (bookDetails3[ISBN]);
  console.log(the_review);
  //let filteredBooks3 = bookDetails3.filter(book => book.title === title);
  //t res.send(filteredBooks3[isbn]);
  res.send(the_review.reviews);
});

module.exports.general = public_users;
