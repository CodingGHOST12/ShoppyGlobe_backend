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

## Data models explained

### User

- `name`: string, required
- `email`: string, required, unique
- `password`: string, required (hashed by bcrypt)

### Product

- `name`: string, required
- `price`: number, required
- `description`: string, required
- `stockQuantity`: number, required

### Cart

- `userId`: link to the User who owns the cart
- `products`: list of items
  - `productId`: link to the Product
  - `quantity`: number of items

## Important middleware

- `authMiddleware.js`: checks JWT tokens and keeps cart routes private
- `errorHandler.js`: catches errors and responds with JSON messages

## Notes for a beginner

- This backend does not yet have a frontend. You can test the API with Postman or Insomnia.
- The cart is stored per user, so different users keep separate carts.
- Product data should be added manually to MongoDB or with a seed script.
- There is no signup validation beyond required fields, so be careful with data input.

## Good next steps to learn more

- Add a `start` script in `package.json`
- Create routes for adding, updating, and deleting products
- Add request validation with `express-validator`
- Add tests using Jest or Mocha
- Add better error messages and status codes

## Troubleshooting

- If the server cannot connect to MongoDB, check `MONGO_URI` and that MongoDB is running.
- If login returns `Invalid credentials`, confirm the email and password are correct.
- If you see `Token is not valid`, make sure the Authorization header uses `Bearer <token>`.

---

If you are new to backend code, start by reading `server.js`, then follow the route files in `routes/`, and finally inspect the controller functions in `controllers/`.
