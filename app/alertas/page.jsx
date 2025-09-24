"use client";

import alertaService from "@/services/alertas";
import { useState, useEffect } from "react";
import { staggeredAnimation } from "@/utils/animationCard";
import { motion } from "framer-motion";
import { useAlertas } from "@/utils/useAlertas";

export default function AlertasPage() {
  const { alertas, loading, fetchAlertas } = useAlertas();
  const [comentarios, setComentarios] = useState({});

  useEffect(() => {  
    fetchAlertas();
  }, []);
  
  const handleClick = async(alerta, comentario, event) => {
    event.preventDefault();
    try{
      await alertaService.update({
      id: alerta.id,
      comentario: comentario
      })
      console.log("✅ Comentario agregado");
      await fetchAlertas();
    } catch (error) {
      console.log("❌ " + error.message);
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800 px-6 py-30">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} 
        className="text-3xl font-bold text-center mb-5">
        Alertas ⚡
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando alertas...</p>
      ) : (
        <div className="flex flex-col gap-6 items-center">
          {alertas.map((alerta, i) => {
            const cardStyle =
              alerta.status === "increased"
                ? "border-green-700 bg-green-100"
                : "border-red-700 bg-red-100";
            return (
              <motion.div
              key={alerta.id}
              initial="hidden"
              animate="visible"
              variants={staggeredAnimation(i)}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`w-full max-w-lg border-2 rounded-2xl shadow-md p-4 transition-shadow hover:shadow-lg ${cardStyle}`}
              >
            
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                  <h2 className="text-xl font-semibold">{alerta.mensaje}</h2>
                  <span className="text-sm mx-0 text-gray-500 text-center sm:text-right whitespace-nowrap">
                    Última inspección en {new Date(alerta.fecha).toLocaleString()}
                  </span>
                </div>

                <div className="border-t pt-3 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                  <p>
                    <span className="font-bold">Equipo:</span>{" "}
                    {alerta.nombre}
                  </p>
                  <div className="text-sm text-gray-500">ID: {alerta.id.slice(0, 8)}…</div>
                  </div>
                  <p>
                    <span className="font-bold">Cantidad actual:</span>{" "}
                    {alerta.cantidadActual} |{" "}
                    <span className="font-bold">Último registro:</span>{" "}
                    {alerta.cantidadRegistro}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4 text-sm text-gray-600">
                  <div><span className="font-bold">SE:</span>{" "}{alerta.subestacion}</div>
                  <div><span className="font-bold">Status:</span>{" "}{alerta.status}</div>
                </div>
                <div className="mt-2 flex items-center justify-between gap-4 text-sm text-gray-600">
                  <div><span className="font-bold">Comentario:</span>{" "}{alerta.comentario}</div>
                </div>
                
                <div className="w-full max-w-lg mt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Input de comentario */}
                    <input
                      type="text"
                      value={comentarios[alerta.id] || ""}
                      onChange={(e) => setComentarios({ ...comentarios, [alerta.id]: e.target.value })}
                      placeholder="Escribe un comentario..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />

                    {/* Botón enviar */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                      onClick={(event) => handleClick(alerta, comentarios[alerta.id] || "", event)}
                    >
                      Subir comentario
                    </motion.button>
                  </div>
                </div>            
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}


