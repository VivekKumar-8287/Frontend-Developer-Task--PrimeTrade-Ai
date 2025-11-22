# **PrimeTrade – Frontend Developer Intern / Full Stack Assignment**

A complete **full-stack application** built with **React + Node.js + MongoDB**, featuring:

- **JWT Authentication**
- **Dashboard CRUD**
- **User-specific search**
- Clean, scalable architecture
- TypeScript support for backend

---

## 🚀 **Tech Stack**

### **Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### **Backend**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication  
- bcrypt  
- CORS  


---

# 📦 **Project Setup Instructions**

Follow these steps to run the backend first, then the frontend.

---

# 🔧 **1. Backend Setup**

### 📁 **Folder Structure (Backend – TypeScript)**

```plaintext
backend/
├── db/                  # Database connection and setup
│   └── db.js
├── middleware/          # Express middlewares
│   ├── auth.js          # JWT authentication middleware
│   └── error.js         # Error handling middleware
├── models/              # Mongoose models (User, Task, etc.)
├── routes/              # Express route handlers
├── utils/               # Utility functions/helpers
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## ✅ **Step 1 — Install Dependencies**  
```bash  cd  backend  npm  install```

----------

## ✅ **Step 2 — Create `.env` File**

Inside `backend/.env`, add:

```env
PORT=5000
MONGO_URI=<your_mongo_DB_connect_link>
JWT_SECRET=<your_secret>
JWT_EXPIRES_IN=7d
```

📌 **Ensure MongoDB is running locally before starting the backend.**

----------

## ✅ **Step 3 — Start Backend Server**

`npm run dev` 

Backend starts at:

`http://localhost:5000` 

----------

# 💻 **2. Frontend Setup (React + Vite)**

### 📁 Folder Structure


```plaintext
frontend/
├── src/
│   ├── api/             # Axios or API service functions (e.g., auth.js, task.js)
│   ├── components/      # Reusable React components (Navbar, UserProfileCard, etc.)
│   ├── pages/           # Route-level pages (Dashboard.jsx, Login.jsx, etc.)
│   ├── hooks/           # Custom React hooks (e.g., useAuth, useTasks)
│   └── App.jsx          # Main App component with routing
├── public/              # Static assets (index.html, favicon, images, etc.)
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration file

```

----------

## ✅ **Step 1 — Install Dependencies**

`cd frontend
npm install` 

----------

## ✅ **Step 2 — Create `.env` File**

Inside the `frontend` folder:

`VITE_API_BASE_URL=http://localhost:5000` 

----------

## ✅ **Step 3 — Start Frontend**

`npm run dev` 

App runs at:

`http://localhost:5173` 

----------

# 🔐 **3. Authentication Features (Deliverable)**

-   Register user
    
-   Login user
    
-   Logout
    
-   `/auth/me` fetch user info
    
-   JWT validation middleware
    
-   Protected routes
    

Passwords are hashed using **bcrypt**, and tokens are created with **JWT** securely.

----------

# 🧪 **4. CRUD Module (Tasks)**

Includes:

-   Create Task
    
-   Get Tasks
    
-   Update Task
    
-   Delete Task

-   Search tasks by title or description specific to the logged-in user

The search feature ensures users only see their own tasks.

----------

# 📄 **5. API Documentation / Postman**

Export your Postman collection and place it in:

`/docs/postman_collection.json` 

### APIs

#### **Auth**

-   `POST /auth/register`
    
-   `POST /auth/login`
    
-   `GET /auth/me`
    

#### **Tasks**

-   `POST /tasks`
    
-   `GET /tasks`
    
-   `PATCH /tasks/:id`
    
-   `DELETE /tasks/:id`

-   `GET /tasks/search?search=<query>` returns only tasks belonging to logged-in user
    

----------

# 🏗️ **6. Scalability (Required in Assignment)**

### **Backend Scalability**

-   Modular folder structure
    
-   Monorepo/Turborepo
    
-   Easy to add new entities
    
-   JWT-based scalable authentication
    
-   Ready for Redis caching
    
-   `.env` configuration
    
-   Ready for Redis caching

-   Easy Docker support
    

### **Frontend Scalability**

-   Component-driven
    
-   Central Axios API layer
    
-   Custom hooks for API calls
    
-   Loading + Toast handling
    
-   Reusable dashboard layout

-   User-specific search integrated

  
### **Recorded Video of Site**


https://github.com/user-attachments/assets/be976a83-79c5-40dd-ae9d-1e25e5ab12c6

