"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Función debounce para animar uno por uno
const staggeredAnimation = (i) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 1, duration: 0.6 }, // 👈 1s por tarjeta
  },
});

export default function RegistrosPage() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/registros");
        const data = await res.json();
        setRegistros(data);
      } catch (error) {
        console.error("Error al cargar registros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800 px-6 py-30">
      <h1 className="text-3xl font-bold text-center mb-8">
        Registros de Subestaciones ⚡
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando registros...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registros.map((registro, i) => (
            <motion.div
              key={registro.id}
              initial="hidden"
              animate="visible"
              variants={staggeredAnimation(i)}
              className="p-[3px] rounded-2xl bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400"
            >
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              {/* Encabezado */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {registro.subestacion}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(registro.date).toLocaleString()}
                </span>
              </div>

              {/* Materiales */}
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Materiales</h3>
                <ul className="space-y-1">
                  {registro.materiales.map((mat, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between px-3 py-1 bg-blue-50 border border-blue-200 rounded-md"
                    >
                      <span>{mat.nombre}</span>
                      <span className="font-semibold">{mat.cantidad}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usuario */}
              <div className="border-t pt-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Registrado por:</span>{" "}
                  {registro.user.name} (@{registro.user.username})
                </p>
              </div>

              {/* CTA / acciones pequeñas */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                  onClick={() => {
                    // ejemplo: abrir modal o navegar
                    console.log("Ver registro", registro.id);
                  }}
                >
                  Ver
                </button>

                <div className="text-sm text-gray-500">ID: {registro.id.slice(0, 8)}…</div>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
