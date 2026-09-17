import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Mail } from "lucide-react";
import api from "../lib/api";

const TABS = [
  { id: "contacts", label: "Inquiries / Messages", endpoint: "/api/admin/contacts" },
  { id: "solutions", label: "Solutions", endpoint: "/api/admin/solutions" },
  { id: "products", label: "Products", endpoint: "/api/admin/products" },
  { id: "services", label: "Services", endpoint: "/api/admin/services" },
  { id: "testimonials", label: "Testimonials", endpoint: "/api/admin/testimonials" },
  { id: "leaders", label: "Leaders", endpoint: "/api/admin/leaders" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(activeTab.endpoint);
      setItems(Array.isArray(res) ? res : res.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    setEditingId(null);
    setFormData(null);
  }, [activeTab]);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const handleCreate = () => {
    const newItem = { id: "new" };
    // Basic defaults based on tab
    if (activeTab.id === "solutions") {
      newItem.name = "";
      newItem.category = "";
      newItem.desc = "";
      newItem.display_order = 0;
      newItem.is_active = true;
    } else if (activeTab.id === "products" || activeTab.id === "services") {
      newItem.title = "";
      newItem.desc = "";
      newItem.icon = "Code2";
      if (activeTab.id === "products") newItem.product_id = `prod-${Date.now()}`;
      if (activeTab.id === "services") {
        newItem.service_id = `serv-${Date.now()}`;
        newItem.tags = [];
        newItem.items = [];
      }
    } else if (activeTab.id === "testimonials") {
      newItem.name = "";
      newItem.role = "";
      newItem.text = "";
    } else if (activeTab.id === "leaders") {
      newItem.name = "";
      newItem.title = "";
      newItem.bio = "";
      newItem.display_order = 0;
      newItem.is_active = true;
    }
    
    setEditingId("new");
    setFormData(newItem);
  };

  const handleSave = async () => {
    try {
      if (editingId === "new") {
        const { id, ...dataToSave } = formData;
        await api.post(activeTab.endpoint, dataToSave);
      } else {
        await api.put(`${activeTab.endpoint}/${editingId}`, formData);
      }
      setEditingId(null);
      setFormData(null);
      fetchItems();
    } catch (err) {
      alert("Error saving: " + (err.data?.detail || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`${activeTab.endpoint}/${id}`);
      fetchItems();
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  const renderField = (key, value) => {
    if (key === "id" || key === "created_at" || key === "updated_at") return null;
    
    if (typeof value === "boolean") {
      return (
        <div key={key} className="mb-4 flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
            className="w-5 h-5 accent-accent"
          />
          <label className="text-sm font-medium capitalize text-white/80">{key.replace("_", " ")}</label>
        </div>
      );
    }
    
    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-white/80 mb-2 capitalize">{key}</label>
          <input
            type="text"
            value={formData[key].join(", ")}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-accent outline-none"
            placeholder="Comma separated values"
          />
        </div>
      );
    }

    const isTextArea = key === "desc" || key === "text" || key === "description";
    
    return (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-white/80 mb-2 capitalize">{key.replace("_", " ")}</label>
        {isTextArea ? (
          <textarea
            value={formData[key] || ""}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-accent outline-none h-24"
          />
        ) : (
          <input
            type="text"
            value={formData[key] || ""}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white focus:border-accent outline-none"
          />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-display font-bold">Content Management</h1>
        {activeTab.id === "contacts" ? (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-accent/20 text-accent border border-accent/30 self-start sm:self-auto">
            {items.length} {items.length === 1 ? "Inquiry" : "Inquiries"} Logged
          </span>
        ) : (
          <button
            onClick={handleCreate}
            className="bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Plus size={18} /> Add New {activeTab.label.slice(0, -1)}
          </button>
        )}
      </div>

      <div className="flex gap-2 border-b border-white/10 mb-8 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-t-xl font-medium whitespace-nowrap transition-colors ${
              activeTab.id === tab.id 
                ? "bg-accent/10 text-accent border-b-2 border-accent" 
                : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted">Loading {activeTab.label}...</div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="glass border border-white/10 rounded-2xl p-6 transition-all">
              {editingId === item.id ? (
                <div>
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-xl font-semibold text-accent">Edit {activeTab.label.slice(0, -1)}</h3>
                    <button onClick={() => setEditingId(null)} className="text-muted hover:text-white p-2">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-x-6">
                    {Object.entries(formData).map(([k, v]) => renderField(k, v))}
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button onClick={() => setEditingId(null)} className="px-5 py-2 rounded-xl text-muted hover:bg-white/5 font-medium transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-accent/20">
                      <Save size={18} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : activeTab.id === "contacts" ? (
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      {item.interest && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                          {item.interest}
                        </span>
                      )}
                      {item.company && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-muted">
                          {item.company}
                        </span>
                      )}
                      {item.created_at && (
                        <span className="text-xs text-muted/70">
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div>
                      <a 
                        href={`mailto:${item.email}`}
                        className="text-accent hover:underline text-sm inline-flex items-center gap-1.5"
                      >
                        <Mail size={14} /> {item.email}
                      </a>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-slate-200 whitespace-pre-wrap mt-2 font-sans">
                      {item.message}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-start">
                    <a
                      href={`mailto:${item.email}?subject=RE: 3CAPSTECH Inquiry&body=Hi ${encodeURIComponent(item.name || '')},%0D%0A%0D%0AThank you for reaching out to 3CAPSTECH.%0D%0A%0D%0A`}
                      className="px-3 py-1.5 bg-accent/15 hover:bg-accent text-accent hover:text-white rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail size={14} /> Reply
                    </a>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-muted transition-colors" 
                      title="Delete Inquiry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.title || item.name || item.key}</h3>
                    <p className="text-muted text-sm line-clamp-2 max-w-2xl">
                      {item.desc || item.text || item.value}
                    </p>
                    {item.is_active === false && (
                      <span className="inline-block mt-2 text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">Inactive</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-white/5 hover:bg-accent hover:text-white rounded-lg text-muted transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-muted transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
          
          {items.length === 0 && editingId !== "new" && (
            <div className="text-center py-16 glass rounded-2xl border border-white/5">
              <p className="text-muted mb-4">No {activeTab.label.toLowerCase()} found.</p>
            </div>
          )}

          {editingId === "new" && (
            <div className="glass border border-accent/30 rounded-2xl p-6 ring-1 ring-accent/20">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-xl font-semibold text-accent">Create New {activeTab.label.slice(0, -1)}</h3>
                <button onClick={() => setEditingId(null)} className="text-muted hover:text-white p-2">
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-x-6">
                {Object.entries(formData).map(([k, v]) => renderField(k, v))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setEditingId(null)} className="px-5 py-2 rounded-xl text-muted hover:bg-white/5 font-medium transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} className="bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-accent/20">
                  <Save size={18} /> Create {activeTab.label.slice(0, -1)}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
