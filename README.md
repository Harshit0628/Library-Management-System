# Library Management System

## Table of Contents
- [Overview](#overview)  
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
                       
                                                       
##     Overview

The Library Management System is a web-based application designed to help librarians and users manage a collection of books efficiently. It provides features for adding new books, searching the collection, managing book genres, and exporting data to XML format.
                     
## Features            
                                                                                        
- User Authentication (Register/Login)   
- Add new books to the library
- Search books by title or author
- View books by genre
- Delete books from the collection
- Export book data to XML format
- Responsive design for various screen sizes
   
## Technologies Used
 
- Frontend:
  - HTML5
  - CSS3 (with Tailwind CSS framework)
  - JavaScript (ES6+)
- Backend:
  - PHP
  - MySQL Database
- Additional Tools:
  - Tailwind CSS for styling
  - Fetch API for AJAX requests

## Installation

1. Set up a local web server (e.g., Apache) with PHP support.

2. Import the database schema:
   - Create a new MySQL database named `library`
   - Import the `database.sql` file to create the necessary tables

3. Configure the database connection:
   - Open `db_connection.php`
   - Update the database credentials:
     ```php
     $host = 'localhost';
     $db   = 'library';
     $user = 'your_username';
     $pass = 'your_password';
     ```

4. Place the project files in your web server's document root.
  
## Usage

1. Access the application through your web browser (e.g., `http://localhost/library-management-system`).

2. Register a new account or log in with existing credentials.

3. Use the interface to add new books, search for books, or manage the collection.

4. To export book data, click the "Export to XML" button.
       
## File Structure
    
``` 
library-management-system/
│
├── index.html
├── login.html
├── register.html
├── script.js
├── auth.js
├── styles.css
├── README.md
│
├── php/
│   ├── db_connection.php
│   ├── add_book.php
│   ├── search_book.php
│   ├── get_genres.php
│   ├── get_books_by_genre.php
│   ├── delete_book.php
│   ├── export_xml.php
│   ├── register.php
│   ├── login.php
│   ├── check_auth.php
│   └── logout.php
│
└── database.sql
```

## API Endpoints

- `POST /php/register.php`: Register a new user
- `POST /php/login.php`: Authenticate a user
- `GET /php/check_auth.php`: Check if a user is authenticated
- `POST /php/logout.php`: Log out a user
- `POST /php/add_book.php`: Add a new book
- `GET /php/search_book.php`: Search for books
- `GET /php/get_genres.php`: Get all book genres
- `GET /php/get_books_by_genre.php`: Get books by genre
- `POST /php/delete_book.php`: Delete a book
- `GET /php/export_xml.php`: Export books to XML

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
