# Blogging Platform API

## Overview

This repository contains the source code for a simple RESTful API built with Node.js using the Express.js framework. The API serves as a backend for a blogging platform, providing user authentication, blog post management, and various security measures.

## Project Setup

### Dependencies

- Node.js
- https
- Express.js
- Mongoose
- Other dependencies (specified in `package.json`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blogging-platform-api.git
   cd blogging-platform-api
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a .env file in the root directory and add the following:
   ```bash
   MONGO_URL=your_mongo_db_connection_string
   SECRET=your_jwt_secret
   PORT=application_port
   ```
4. Run the application:

   ```bash
   npm start
   ```

# API Documentation
## User Authentication
### Registration:
```bash
POST /api/user/register
```
Request Body:
```bash
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Login:
```bash
POST /api/user/login
```
Request Body:
```bash
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

## Blog Post
### Get All Blogs:
```bash
GET /api/blog/all
```
### Get Individual Blog:
```bash
GET /api/blog/individual/:blogId
```
### Create New Blog:
```bash
POST /api/blog/new
```
Request Body:
```bash
{
  "title": "Blog Title",
  "description": "Blog Content"
}
```
### Update Blog:
```bash
PUT /api/blog/update/:blogId
```
Request Body:
```bash
{
  "title": "Updated Title",
  "description": "Updated Content"
}
```
### Delete Blog:
```bash
DELETE /api/blog/delete/:blogId
```
### Search Blog:
```bash
GET /api/blog/search?blogTitle=SearchKeyword
```
   

   
