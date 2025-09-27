
# 📝 Todo API

A simple **Todo REST API** built with **Node.js, Express, PostgreSQL**, and **Swagger** for documentation.  
It supports user authentication (session-based), CRUD operations on todos, request rate limiting, and API docs via Swagger UI.  

---

## ⚡ Features
- 🔐 User authentication (`/auth/register`, `/auth/login`)  
- ✅ Session-based authentication (via `session_id`)  
- 📝 Todo CRUD operations (`/todos`)  
- ⚡ Rate limiting middleware for `/todos` endpoints  
- 📖 API documentation with Swagger UI at `/docs`  
- 🛡️ Centralized error handling  

---

## 📦 Tech Stack
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Swagger UI](https://swagger.io/tools/swagger-ui/)  
- [CORS](https://github.com/expressjs/cors)  
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)  
- [dotenv](https://www.npmjs.com/package/dotenv)  

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/todo-api.git
cd todo-api
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/todos
```

### 4️⃣ Run the server

```bash
npm start
```

Server will be running at:

```
http://localhost:5000
```

Swagger docs available at:

```
http://localhost:5000/docs
```

---

## 📖 API Endpoints

### Auth

* `POST /auth/register` → Register a new user
* `POST /auth/login` → Login and receive a `session_id`

### Todos

* `GET /todos?page=1&limit=10` → Get paginated todos
* `POST /todos` → Create new todos (batch supported)
* `PUT /todos/{id}` → Update a todo
* `DELETE /todos/{id}` → Delete a todo

---

## 🔑 Authentication

This API uses a **session_id** token for authentication.
You can pass it in one of two ways:

* As a **header**:

  ```http
  session_id: <your-session-token>
  ```

---
