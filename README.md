# 🚲 Pet Care and Tips -PawPedia Blogging Site Backend

Welcome to the Pet Care and Tips -PawPedia Blogging Site backend project! This backend is designed to support a seamless blogging service. Below you'll find a comprehensive overview of the project, its features, the technologies used, and how to set it up and run it on your local machine.

Backend Api Live: [https://pet-care-backend-api.vercel.app/]

---

## 📖 Overview

This backend system is developed for a blogging service that allows users to register, log in, view available post, and book premium post. The system is equipped with CRUD operations, user authentication, and robust error handling to ensure a smooth user experience.

## ✨ Features

- **User Authentication and Authorization:** Secure sign-up, login, and profile management.
- **Profile Management:** CRUD operations for managing User Account.
- **Post creation:** Create and interaction on post with upvote, downvote and comments.
- **Post, Comment, Upvote, Downvote, CRUD Management.
- **Error Handling:** Comprehensive error handling for robust API responses.
- **Data Validation:** Uses Zod for request validation to ensure data integrity.

## 🛠️ Technologies Used

- **Programming Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation Library:** Zod
- **Authentication:** JWT (JSON Web Token)
- **Cludinary for Image CRUD

## 🚀 Getting Started

Follow these instructions to get the backend up and running on your local machine.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imtanvir/assignment-6-backend.git
   cd pet-care-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGO_URI=mongodb://mongodb_credentials/
   JWT_SECRET=your_jwt_secret
    etc ...
   ```

4. **Run the application:**

   ```bash
   //for locally
   npm run start:dev
   ```

   The server will start on `http://localhost:5000`.

## 📚 API Endpoints

Here’s a detailed reference for the API endpoints available in the system.

### User Routes

#### **Sign Up**

- **Route:** `/api/auth/signup`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St, Anytown",
    "role": "user"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
      /* user data */
    }
  }
  ```

#### **Login**

- **Route:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "token": "jwt_token",
    "data": {
      /* user data */
    }
  }
  ```

#### **Get Profile**

- **Route:** `/api/user/`
- **Method:** `GET`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User profile retrieved successfully",
    "data": {
      /* user data */
    }
  }
  ```

#### **Update Profile**

- **Route:** `/api/user/update/:id`
- **Method:** `PUT`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Request Body:**

  ```json
  {
    "name": "John Updated",
    "phone": "0987654321"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Profile updated successfully",
    "data": {
      /* updated user data */
    }
  }
  ```

### Post Routes

#### **Create Post (User Only)**

- **Route:** `/api/post/create-post`
- **Method:** `POST`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Request Body:**

#### **Get All Post**

- **Route:** `/api/v1/post/all-post`
- **Method:** `GET`
- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "All Post retrieved successfully",
    "data": [
      /* list of post */
    ]
  }
  ```

#### **Update Profile **

- **Route:** `/api/v1/user/update/:id`
- **Method:** `PUT`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Request Body:**

  ```json
  {
    "name": "Tanvir"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Profile updated successfully",
    "data": {
      /* updated profile data */
    }
  }
  ```

#### **Delete Comment (user Only)**

- **Route:** `/api/v1/post/delete-comment-on-post//:id`
- **Method:** `DELETE`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Response:**


### Edit Comment

#### **Edit Comment**

- **Route:** `/api/v1/post/update-comment-on-post/`
- **Method:** `PUT`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Request Body:**


#### **Search post**

- **Route:** `/api/v1/post/all-post?limit=5&skip=10`
- **Method:** `GET`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Request Body:** Not needed
- **Response:**


#### **Get All User post for User**

- **Route:** `/api/v1/post/user-posts/`
- **Method:** `GET`
- **Request Headers:** `Authorization: Bearer jwt_token`
- **Response:**

## ⚠️ Error Handling and Validation

The system is equipped with a global error handler to catch and handle errors gracefully, providing meaningful responses. We use Zod for validating request bodies to ensure the data integrity of user inputs.

### Error Response Format

- **Success:** `false`
- **Message:** A descriptive error message.
- **Error Messages:**

  ```json
  [
    {
      "path": "",
      "message": "Detailed error message"
    }
  ]
  ```

### Common Errors

- **No Data Found:**

  ```json
  {
    "success": false,
    "message": "No Data Found",
    "data": []
  }
  ```

- **Route Not Found:**

  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Not Found"
  }
  ```

- **Unauthorized Access:**

  ```json
  {
    "success": false,
    "statusCode": 401,
    "message": "You have no access to this route"
  }
  ```

## 🛡️ Security Considerations

- **JWT Tokens:** Secure authentication using JWT tokens.
- **Password Hashing:** User passwords are securely hashed before storage.
-
