import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleHamburgerClick = () => {
    if (!token) {
      toast.error("Login first to open dashboard!");
      return;
    }
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out!");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-40">
      <div className="w-full p-4 flex justify-between items-center">

        {/* HAMBURGER (mobile only) */}
        <button
          className="sm:hidden text-2xl"
          onClick={handleHamburgerClick}
        >
          ☰
        </button>

        {/* LOGO */}
        <Link to="/" className="font-bold text-lg">
          MyApp
        </Link>

        {/* RIGHT SIDE BUTTON (Mobile only) */}
        {token ? (
          <button
            onClick={handleLogout}
            className="sm:hidden bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <></>
        )}

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex space-x-4">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
