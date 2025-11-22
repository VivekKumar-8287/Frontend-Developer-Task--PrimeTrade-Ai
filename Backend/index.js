import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middleware/error.js"
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

// Import DB connection
import "./db/db.js";   // This will execute DB connection

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("API working ✔");
});

app.use("/api/auth",authRoutes);
app.use("/api/task",taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
