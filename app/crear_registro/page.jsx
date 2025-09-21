"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CrearRegistroPage() {
  const [subestacion, setSubestacion] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Simulación de NFC scan: agrega un material "random"
  const handleScanNFC = () => {
    const mockMateriales = [
      { nombre: "CPC100", cantidad: 1 },
      { nombre: "TDR9000", cantidad: 1 },
      { nombre: "DILO", cantidad: 1 },
      { nombre: "LCM500", cantidad: 1 },
    ];
    const random = mockMateriales[Math.floor(Math.random() * mockMateriales.length)];
    setMateriales((prev) => {
      const existing = prev.find((m) => m.nombre === random.nombre);
      if (existing) {
        return prev.map((m) =>
          m.nombre === random.nombre ? { ...m, cantidad: m.cantidad + 1 } : m
        );
      }
      return [...prev, random];
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    // setMensaje("");

    // try {
    //   const res = await fetch("http://localhost:3000/api/registros", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2Q1YzFlNWExYzZmMmQwZTk5NGY3MiIsInVzZXJuYW1lIjoibWFpYyIsImlhdCI6MTc1ODI5OTk2MiwiZXhwIjoxNzU4OTA0NzYyfQ.FvNxnQj4jHF3fdQcjuDMDsC1KRjLXen3RCcyBC-1JD0",
    //     },
    //     body: JSON.stringify({
    //       subestacion,
    //       materiales,
    //     }),
    //   });

    //   if (!res.ok) throw new Error("Error al crear registro");

    //   setMensaje("✅ Registro creado con éxito");
    //   setSubestacion("");
    //   setMateriales([]);
    // } catch (error) {
    //   setMensaje("❌ " + error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-6 py-30">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Crear Registro ⚡
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6"
      >
        {/* Subestación */}
        <div>
          <label className="block mb-2 font-medium">Subestación</label>
          <input
            type="text"
            value={subestacion}
            onChange={(e) => setSubestacion(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: SE Zorritos"
            required
          />
        </div>

        {/* Materiales */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Materiales escaneados</label>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // onClick={handleScanNFC}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow hover:opacity-90 transition"
            >
              📡 Escanear NFC
            </motion.button>
          </div>
          {materiales.length === 0 ? (
            <p className="text-sm text-gray-500">No hay materiales aún</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materiales.map((mat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  className="p-4 border-2 border-indigo-400 rounded-xl bg-indigo-50 flex justify-between items-center"
                >
                  <span className="font-medium">{mat.nombre}</span>
                  <span className="px-3 py-1 bg-indigo-200 rounded-lg font-semibold">
                    {mat.cantidad}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Botón enviar */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 transition"
        >
          {loading ? "Enviando..." : "Crear Registro"}
        </motion.button>

        {/* Mensaje */}
        {mensaje && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-medium"
          >
            {mensaje}
          </motion.p>
        )}
      </form>
    </div>
  );
}
