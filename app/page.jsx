"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const addUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Juan", email: "juan@test.com" }),
    });
    const newUser = await res.json();
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Usuarios</h1>
      <button
        onClick={addUser}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Agregar usuario
      </button>
      <ul className="mt-4">
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </main>
  );
}

