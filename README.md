# ShoppyGlobe Backend

Welcome to the ShoppyGlobe backend. This project is a beginner-friendly Node.js server for a small e-commerce app. It handles user sign-up, sign-in, product browsing, and cart operations using MongoDB.

## What this project does

- Lets people register and log in
- Uses JWT tokens to protect user-only routes
- Shows a list of products and individual product details
- Creates and updates a shopping cart for each logged-in user
- Stores data in MongoDB with Mongoose
- Sends clear JSON responses for success and error cases

## Why this is useful

If you are learning backend development, this app is a good starting point because it shows how to:

- connect Express to MongoDB
- build API routes
- use controllers for business logic
- secure routes with authentication
- manage related data with Mongoose models

## Tech used in this project

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- Password hashing with `bcryptjs`
- `.env` configuration with `dotenv`

## Project structure

- `server.js` - starts the Express server and loads routes
- `config/db.js` - connects to MongoDB
- `controllers/` - functions that handle requests
- `routes/` - endpoint definitions
- `middleware/` - auth and error handling
- `models/` - data schemas for User, Product, and Cart
- `.env` - local environment settings

## Getting started

### Requirements

- Node.js installed
- MongoDB running locally or remotely

### Install packages

```powershell
npm install
```

### Create `.env`

Create a file called `.env` in the project root and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_jwt_secret_here
```

### Run the server

```powershell
node server.js
```

Then open `http://localhost:5000` for the API.

## API endpoints

### 1) Register new user

- URL: `POST /register`
- Body:
  - `name` (string)
  - `email` (string)
  - `password` (string)

Example body:

```json
{
  "name": "Rohan",
  "email": "rohan@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "User registered",
  "userId": "<user-id>"
}
```

### 2) Login user

- URL: `POST /login`
- Body:
  - `email` (string)
  - `password` (string)

Success response:

```json
{
  "token": "<jwt-token>"
}
```

Save the token to use protected cart routes.

### 3) List products

- URL: `GET /products`
- No body required

Returns all products from the database.

### 4) Product details

- URL: `GET /products/:id`
- Replace `:id` with a product ID

Returns one product or `404` if not found.

### 5) Add item to cart

- URL: `POST /cart`
- Header: `Authorization: Bearer <token>`
- Body:
  - `productId` (string)
  - `quantity` (number)

If the user does not have a cart yet, a new one is created.

### 6) Update cart quantity

- URL: `PUT /cart/:id`
- Header: `Authorization: Bearer <token>`
- Body:
  - `quantity` (number)

Here, `:id` is the product ID inside the cart.

### 7) Remove item from cart

- URL: `DELETE /cart/:id`
- Header: `Authorization: Bearer <token>`

Use the product ID to remove the item.
