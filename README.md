# Notes API

This project is a backend application that provides APIs for managing notes. It allows users to perform CRUD (Create, Read, Update, Delete) operations on notes through a RESTful API.

## Features

- **Create:** Allows users to create new notes.
- **Read:** Retrieves notes based on specified criteria.
- **Update:** Enables users to update existing notes.
- **Delete:** Deletes notes from the system.

## Technologies Used

- **Node.js:** Backend JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing notes.
- **Mongoose:** MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens):** For authentication and authorization.
- **bcrypt:** For hashing user passwords securely.
- **Postman:** Used for testing API endpoints during development.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/georgeadly17/Notes-API.git
   
2. **Install dependencies:**

    ```bash
    cd Notes-API
    npm install
3. **Set up environment variables:**
   
   Create a .env file in the root directory and provide the following variables:
   ```bash
   PORT=3000
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
4. **Start the server:**

   ```bash
   npm start

5. **Testing the API:**

   You can use tools like Postman to test the API endpoints. Here are some sample endpoints:

   - POST /api/auth/register: Register a new user.
   - POST /api/auth/login: Log in with registered credentials to obtain a JWT token.
   - GET /api/notes: Retrieve all notes.
   - GET /api/notes/:id: Retrieve a specific note by ID.
   - POST /api/notes: Create a new note.
   - PUT /api/notes/:id: Update an existing note.
   - DELETE /api/notes/:id: Delete a note.

## Contributors
**George Adly**

## License
   This project is licensed under the MIT License.
