import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaFileInvoice,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">
      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        Mini ERP
      </div>

      <nav className="mt-5 flex flex-col">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/customers"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaUsers />
          Customers
        </NavLink>

        <NavLink
          to="/products"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaBox />
          Products
        </NavLink>

        <NavLink
          to="/challans"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaFileInvoice />
          Challans
        </NavLink>

        <button
          className="flex items-center gap-3 px-6 py-4 mt-auto hover:bg-red-700"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;