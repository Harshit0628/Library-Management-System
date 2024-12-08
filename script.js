document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('addBookForm');
    const searchForm = document.getElementById('searchForm');
    const exportXMLButton = document.getElementById('exportXML');
    const genreList = document.getElementById('genreList');
    const bookList = document.getElementById('bookList');

    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(addBookForm)) {
            submitBook();
        }
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchBooks();
    });

    exportXMLButton.addEventListener('click', () => {
        exportToXML();
    });

    loadGenres();
});

function validateForm(form) {
    const title = form.title.value.trim();
    const author = form.author.value.trim();
    const publicationYear = parseInt(form.publicationYear.value);
    const genre = form.genre.value.trim();

    if (!title || !author || !publicationYear || !genre) {
        showMessage('Please fill in all fields.', 'error');
        return false;
    }

    const currentYear = new Date().getFullYear();
    if (publicationYear < 1000 || publicationYear > currentYear) {
        showMessage('Please enter a valid publication year.', 'error');
        return false;
    }

    return true;
}

function submitBook() {
    const formData = new FormData(document.getElementById('addBookForm'));
    
    fetch('add_book.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Book added successfully!', 'success');
            document.getElementById('addBookForm').reset();
            loadGenres();
        } else {
            showMessage('Error adding book: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred while adding the book.', 'error');
    });
}

function searchBooks() {
    const searchQuery = document.getElementById('searchQuery').value.trim();
    
    fetch(`search_book.php?query=${encodeURIComponent(searchQuery)}`)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            displaySearchResults(data);
        } else {
            throw new Error('Invalid response format');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred while searching for books. Please try again.', 'error');
    });
}

function displaySearchResults(results) {
    const resultsList = document.getElementById('resultsList');
    const searchResults = document.getElementById('searchResults');
    
    resultsList.innerHTML = '';
    searchResults.classList.remove('hidden');
    
    if (results.length === 0) {
        resultsList.innerHTML = '<li class="text-gray-600">No books found.</li>';
    } else {
        results.forEach(book => {
            const li = document.createElement('li');
            li.className = 'text-gray-800';
            li.innerHTML = `<span class="font-medium">${book.title}</span> by ${book.author} (${book.publication_year}) - ${book.genre}`;
            resultsList.appendChild(li);
        });
    }
}

function exportToXML() {
    fetch('export_xml.php')
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'library_books.xml';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        showMessage('XML file exported successfully!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred while exporting to XML: ' + error.message, 'error');
    });
}

function showMessage(message, type) {
    const alertClass = type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700';
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 px-4 py-3 rounded border ${alertClass} custom-shadow`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        <strong class="font-bold">${type === 'error' ? 'Error:' : 'Success:'}</strong>
        <span class="block sm:inline"> ${message}</span>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function loadGenres() {
    fetch('get_genres.php')
    .then(response => response.json())
    .then(genres => {
        displayGenres(genres);
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred while loading genres.', 'error');
    });
}

function displayGenres(genres) {
    const genreList = document.getElementById('genreList');
    genreList.innerHTML = '';
    
    genres.forEach(genre => {
        const button = document.createElement('button');
        button.className = 'bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';
        button.textContent = genre;
        button.addEventListener('click', () => loadBooksByGenre(genre));
        genreList.appendChild(button);
    });
}

function loadBooksByGenre(genre) {
    fetch(`get_books_by_genre.php?genre=${encodeURIComponent(genre)}`)
    .then(response => response.json())
    .then(books => {
        displayBooks(books);
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred while loading books.', 'error');
    });
}

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'bg-white rounded-lg p-6 custom-shadow transition duration-300 ease-in-out transform hover:scale-105';
        bookDiv.innerHTML = `
            <h3 class="font-bold text-xl mb-2 text-gray-800">${book.title}</h3>
            <p class="text-gray-600 mb-2">Author: ${book.author}</p>
            <p class="text-gray-600 mb-2">Year: ${book.publication_year}</p>
            <p class="text-gray-600 mb-4">Genre: ${book.genre}</p>
            <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 delete-book" data-id="${book.id}">
                Delete
            </button>
        `;
        bookList.appendChild(bookDiv);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-book').forEach(button => {
        button.addEventListener('click', (e) => deleteBook(e.target.dataset.id));
    });
}

function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        fetch('delete_book.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${bookId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Book deleted successfully!', 'success');
                loadGenres(); // Reload genres and books
            } })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred while deleting the book.', 'error');
        });
    }
}