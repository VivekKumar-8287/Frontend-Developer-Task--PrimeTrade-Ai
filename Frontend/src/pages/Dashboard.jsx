import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserProfileCard from "../components/UserProfileCard";
import { me } from "../services/auth";
import {
  createTask,
  deleteTask,
  fetchTasks,
  searchTasks,
  updateTask,
} from "../services/task";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  
  const loadTasks = async () => {
    try {
      setError("");
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    }
  };

 
  const loadProfile = async () => {
    try {
      const res = await me();
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  
  useEffect(() => {
    if (searchText.trim() === "") {
      loadTasks(); 
    }
  }, [searchText]);

 
  const loadSearchResults = async () => {
    if (!searchText.trim()) {
      return loadTasks();
    }

    try {
      setError("");
      const data = await searchTasks(searchText);
      setTasks(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setTasks([]);
        setError(err.response.data.message || "No tasks found");
      } else if (err.response && err.response.status === 400) {
        setTasks([]);
        setError(err.response.data.message || "Invalid search input");
      } else {
        setTasks([]);
        setError("Something went wrong. Please try again.");
      }
    }
  };

 
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTask(editingId, formData);
      } else {
        await createTask(formData);
      }
      setFormData({ title: "", description: "" });
      setEditingId(null);
      loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to save task");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete?")) {
      try {
        await deleteTask(id);
        loadTasks();
      } catch (err) {
        console.error(err);
        setError("Failed to delete task");
      }
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setFormData({ title: task.title, description: task.description });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="pt-[72px] flex bg-gray-100">
        <aside
          className={`
            fixed top-[72px] left-0 h-[calc(100vh-72px)] 
            bg-white shadow-lg border-r 
            w-64 p-4 z-30 transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0  /* Desktop always visible */
          `}
        >
          <button
            className="sm:hidden absolute right-3 top-3 text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>

          <h2 className="text-lg font-semibold mb-4">Menu</h2>

          <nav className="space-y-2 mt-6">
            <button
              onClick={() => {
                setActiveTab("tasks");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === "tasks"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              📋 All Tasks
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === "profile"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              👤 User Profile
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:ml-64 transition-all min-h-screen">
          <div className="bg-white p-6 rounded-xl shadow">
            {activeTab === "tasks" && (
              <>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="p-2 border rounded-lg flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") loadSearchResults();
                    }}
                  />
                  <button
                    onClick={loadSearchResults}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Search
                  </button>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

                <form
                  onSubmit={handleSubmit}
                  className="bg-gray-100 p-4 rounded-lg mb-6"
                >
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Task title"
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded-lg"
                    required
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Task description"
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border rounded-lg"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    {editingId ? "Update Task" : "Add Task"}
                  </button>
                </form>

                <div className="grid grid-cols-1 gap-4">
                  {tasks.map((task) => (
                    <div key={task._id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm mt-1">{task.description}</p>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit(task)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">User Profile</h2>

                <UserProfileCard user={user} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
