import { useEffect, useState } from "react";


const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  async function loadItems() {
    const res = await fetch(`${API_URL}/api/items`);
    const data = await res.json();
    setItems(data.items);
  }

  async function addItem(e) {
    e.preventDefault();
    await fetch(`${API_URL}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
          width: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          📋 Lista de Tareas
        </h1>

        <form
          onSubmit={addItem}
          style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nueva tarea"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: "none",
              background: "#667eea",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Añadir
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                padding: "10px",
                marginBottom: "8px",
                background: "#f4f4f4",
                borderRadius: "8px",
                transition: "0.2s",
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}