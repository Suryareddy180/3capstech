import React from "react";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Globe } from "lucide-react";

export default function AdminLayout() {
  const token = localStorage.getItem("admin_token");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-64 glass border-r border-white/10 flex flex-col p-6 h-auto md:h-screen sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-10 text-accent font-display font-bold text-xl">
          <LayoutDashboard /> Admin Panel
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 text-accent font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-muted hover:text-white transition-colors">
            <Globe size={18} /> View Live Site
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 font-medium transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>
      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
