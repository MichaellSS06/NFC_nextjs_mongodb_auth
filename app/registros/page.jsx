"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import registroService from "@/services/registros";
import debounce from 'just-debounce-it';

// Función debounce para animar uno por uno
const staggeredAnimation = (i) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.5, duration: 0.6 }, // 👈 1s por tarjeta
  },
});

export default function RegistrosPage() {
  const {registros, setRegistros} = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setRegistroActual } = useAuth();

  const [filtroSubestacion, setFiltroSubestacion] = useState("");
  const [filtroMaterial, setFiltroMaterial] = useState("");

  useEffect(() => {
    const fetchRegistros = async () => {
      setLoading(true);
      try {
        const res = await registroService.getAll();
        setRegistros(res);
      } catch (error) {
        console.error("Error al cargar registros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  const registrosFinal = useMemo(() => {
    if (!registros) return [];

    return registros.filter((registro) => {
      const matchSub = filtroSubestacion.trim()
        ? registro.subestacion?.toLowerCase().includes(filtroSubestacion.toLowerCase())
        : true;

      const matchMat = filtroMaterial.trim()
        ? registro.materiales?.some((mat) =>
            mat.nombre.toLowerCase().includes(filtroMaterial.toLowerCase())
          )
        : true;

      return matchSub && matchMat;
    });
  }, [registros, filtroMaterial, filtroSubestacion]);

  const debouncedSetInput = useCallback(
      debounce((text, setEstado) => {
        setEstado(text);
      }, 1000),
      []
    );

  // useEffect(() => {
  // return () => {
  //   debouncedSetInput.cancel();
  //   };
  // }, [debouncedSetInput]);

  const handleFilter = (newText, setEstado) => {
      if (newText.startsWith(' ')) return;
      debouncedSetInput(newText, setEstado);
    }
  
  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800 px-6 py-30">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} 
        className="text-3xl font-bold text-center mb-5">
        Registros de Subestaciones ⚡
      </motion.h1>

      <div className="flex justify-center bg-gray-100 pb-5 min-h-min">
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl p-4 border-2 border-dashed border-gray-400 rounded-xl bg-white flex flex-col space-y-3 items-center">
        <h2 className="mb-2 font-bold text-xl">Filtrar{'  '}<span> {'   '} </span></h2>
        <div className="flex flex-row space-x-2 space-y-0">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-center items-center mb-0">
                <label className="block mb-2 font-medium">Subestación</label>
              </div>
              <input
                type="text"
                onChange={(event)=>handleFilter(event.target.value, setFiltroSubestacion)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: SE Zorritos"
                required
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="block mb-2 font-medium">Equipo/material</label>
              <input
                type="text"
                onChange={(event) => handleFilter(event.target.value, setFiltroMaterial)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: CPC100"
                required
              />
            </div>
        </div>
      </motion.div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando registros...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrosFinal.map((registro, i) => (
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
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                  onClick={() => {
                    // ejemplo: abrir modal o navegar
                    setRegistroActual(registro)
                    router.push(`/registros/${registro.id}`)
                    console.log("Ver registro", registro.id);
                  }}
                >
                  Ver
                </motion.button>

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
