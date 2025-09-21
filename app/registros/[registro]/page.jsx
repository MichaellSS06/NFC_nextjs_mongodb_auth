"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function EditarRegistroPage() {
  const { id } = useParams(); // captura el id dinámico
  const [subestacion, setSubestacion] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

//   useEffect(() => {
//     const fetchRegistro = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/registros/${id}`, {
//           cache: "no-store",
//         });
//         const data = await res.json();
//         setSubestacion(data.subestacion);
//         setMateriales(data.materiales);
//       } catch (error) {
//         console.error("Error cargando registro:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchRegistro();
//   }, [id]);

  const handleDeleteMaterial = (nombre) => {
    setMateriales((prev) => prev.filter((m) => m.nombre !== nombre));
  };

  const handleCantidadChange = (nombre, cantidad) => {
    setMateriales((prev) =>
      prev.map((m) => (m.nombre === nombre ? { ...m, cantidad } : m))
    );
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setMensaje("⏳ Guardando cambios...");

    // try {
    //   const res = await fetch(`http://localhost:3000/api/registros/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2Q4YjQxMWMyYzYyMjcyYmFjYWU1NiIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTc1ODMwMTA5OCwiZXhwIjoxNzU4OTA1ODk4fQ.s62fvV0ywm6wwHGZIMOnHlOfiN0tB0gwKsvlGjurNUY",
    //     },
    //     body: JSON.stringify({
    //       subestacion,
    //       materiales,
    //     }),
    //   });

    //   if (!res.ok) throw new Error("Error al actualizar registro");

    //   setMensaje("✅ Cambios guardados con éxito");
    // } catch (error) {
    //   setMensaje("❌ " + error.message);
    // }
  };

  if (loading) return <p className="py-30 text-center mt-10">Cargando registro...</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-6 py-30">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Editar Registro
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
            required
          />
        </div>

        {/* Materiales */}
        <div>
          <label className="block mb-2 font-medium">Materiales</label>
          <div className="space-y-3">
            {materiales.map((mat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
              >
                <span className="font-medium">{mat.nombre}</span>
                <input
                  type="number"
                  value={mat.cantidad}
                  onChange={(e) =>
                    handleCantidadChange(mat.nombre, parseInt(e.target.value))
                  }
                  className="w-20 px-2 py-1 border rounded-lg text-center"
                  min="0"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteMaterial(mat.nombre)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                >
                  Eliminar
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botón Guardar */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition"
        >
          Guardar Cambios
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
