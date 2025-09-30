import React, { useState } from "react";

export default function App() {
  const [orders, setOrders] = useState([
    { id: 1, products: ["Shirt"], status: "pending" },
    { id: 2, products: ["Shoes"], status: "shipped" },
  ]);

  const [products, setProducts] = useState("");
  const [status, setStatus] = useState("pending");

  const addOrder = (e) => {
    e.preventDefault();
    if (!products.trim()) return; // prevent empty order
    const newOrder = {
      id: Date.now(),
      products: products.split(",").map((p) => p.trim()),
      status,
    };
    setOrders([...orders, newOrder]);
    setProducts("");
    setStatus("pending");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Orders</h2>
      <form onSubmit={addOrder} style={{ marginBottom: "1rem" }}>
        <input
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          placeholder="Products (comma separated)"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />
        <select
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">pending</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
        </select>
        <button style={{ padding: "0.5rem 1rem" }}>Add Order</button>
      </form>

      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            <strong>{o.id}</strong> – {o.products.join(", ")}{" "}
            <em>({o.status})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
