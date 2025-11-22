import axios from "axios";
import api from './api';

const API = "http://localhost:5000/api/task";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// ===========================
// 🔹 Fetch all tasks
// ===========================
export const fetchTasks = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};

// ===========================
// 🔹 Search tasks by query (title or description)
// ===========================
export const searchTasks = async (searchQuery) => {
  if (!searchQuery || searchQuery.trim() === "") {
    throw { response: { status: 400, data: { message: "Please provide a search query" } } };
  }

  try {
    const res = await axios.get(`${API}/search`, {
      params: { search: searchQuery },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ===========================
// 🔹 Create new task
// ===========================
export const createTask = async (taskData) => {
  const res = await axios.post(API, taskData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};

// ===========================
// 🔹 Update task
// ===========================
export const updateTask = async (id, taskData) => {
  const res = await axios.patch(`${API}/${id}`, taskData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};

// ===========================
// 🔹 Delete task
// ===========================
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};
