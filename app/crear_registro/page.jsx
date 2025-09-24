"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import registroService from "@/services/registros";
import alertaService from "@/services/alertas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { compareMaterials } from "@/utils/compareMaterials";

export default function CrearRegistroPage() {
  const [subestacion, setSubestacion] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [nuevoMaterial, setNuevoMaterial] = useState("");
  const scanningRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();
  const {registros} = useAuth();

  // Simulación de NFC scan: agrega un material "random"
  const handleScanNFC = async () => {
    if ("NDEFReader" in window) {
      // 📡 Escaneo real NFC (solo Chrome/Android)
      try {
        if (scanningRef.current) {
          console.log("Ya hay un escaneo en curso 🚫");
          return;
        }
        const ndef = new NDEFReader();
        await ndef.scan();
        console.log("📡 Escaneando NFC...");
        scanningRef.current = true;

        ndef.onreading = (event) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            if (record.recordType === "text") {
              const nombre = decoder.decode(record.data);
              console.log("✅ Tag leído:", nombre);

              setMateriales((prev) => {
                const existing = prev.find((m) => m.nombre === nombre);
                if (existing) {
                  return prev.map((m) =>
                    m.nombre === nombre ? { ...m, cantidad: m.cantidad + 1 } : m
                  );
                }
                return [...prev, { nombre, cantidad: 1 }];
              });
            }
          }
        };
      } catch (err) {
        console.error("❌ Error al leer NFC:", err);
      }
    } else {
      // 🖥 Mock en PC (para pruebas sin NFC)
      const mockMateriales = [
        { nombre: "CPC100", cantidad: 1 },
        { nombre: "TDR9000", cantidad: 1 },
        { nombre: "DILO", cantidad: 1 },
        { nombre: "LCM500", cantidad: 1 },
      ];
      const random = mockMateriales[Math.floor(Math.random() * mockMateriales.length)];
      console.log("💻 Mock NFC leído:", random.nombre);

      setMateriales((prev) => {
        const existing = prev.find((m) => m.nombre === random.nombre);
        if (existing) {
          return prev.map((m) =>
            m.nombre === random.nombre ? { ...m, cantidad: m.cantidad + 1 } : m
          );
        }
        return [...prev, random];
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("⏳ Creando registro...");

    try {
      await registroService.create({
        subestacion: subestacion,
        materiales: materiales
      })
      setMensaje("⏳ Verificando alertas...");
      setSubestacion("");
      setMateriales([]);

      const comparaciones = compareMaterials(registros, materiales, subestacion)
      console.log(comparaciones)
      comparaciones && comparaciones.length>0 && await Promise.all(
        comparaciones.map((alerta) =>
          alertaService.create({
            cantidadActual: alerta.cantidadActual,
            cantidadRegistro: alerta.cantidadRegistro,
            fecha: alerta.fecha,
            mensaje: alerta.mensaje,
            nombre: alerta.nombre,
            status: alerta.status,
            subestacion: alerta.subestacion
          })
        )
      );

      setMensaje("✅ Registro creado con éxito");

      setTimeout(() => {
        router.push("/registros")
      }, 1000)
      
    } catch (error) {
      setMensaje("❌ " + error.message);
    } finally {
      setLoading(false);
    }
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
              onClick={handleScanNFC}
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
                  className="p-4 border-2 border-indigo-400 rounded-xl bg-indigo-50 flex justify-between items-center space-x-3"
                >
                  <span className="font-medium flex-1 truncate">{mat.nombre}</span>
                  
                      {/* Cantidad con botones */}
                  <div className="flex items-center space-x-2">
                    {/* Botón + */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setMateriales((prev) =>
                          prev.map((m) =>
                            m.nombre === mat.nombre
                              ? { ...m, cantidad: m.cantidad + 1 }
                              : m
                          )
                        )
                      }
                      className="px-2 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                    >
                      +
                    </motion.button>

                    {/* Cantidad */}
                    <span className="px-3 py-1 bg-indigo-200 rounded-lg font-semibold min-w-[40px] text-center">
                      {mat.cantidad}
                    </span>

                    {/* Botón - */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setMateriales((prev) =>
                          prev
                            .map((m) =>
                              m.nombre === mat.nombre
                                ? { ...m, cantidad: m.cantidad - 1 }
                                : m
                            )
                            .filter((m) => m.cantidad > 0) // elimina si llega a 0
                        )
                      }
                      className="px-2 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                    >
                      –
                    </motion.button>

                    {/* Botón eliminar */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setMateriales((prev) =>
                          prev.filter((m) => m.nombre !== mat.nombre)
                        )
                      }
                      className="px-2 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                    >
                      ✕
                    </motion.button>
                  </div>

                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-4 border-2 border-dashed border-gray-400 rounded-xl bg-white flex flex-col space-y-3"
        >
          <span className="font-medium text-gray-600">Agregar material manual</span>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
            {/* Campo nombre */}
            <input
              type="text"
              placeholder="Nombre del material"
              value={nuevoMaterial}
              onChange={(e) => setNuevoMaterial(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* Botón agregar */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!nuevoMaterial.trim()) return;
                setMateriales((prev) => {
                  const existing = prev.find((m) => m.nombre === nuevoMaterial.trim());
                  if (existing) {
                    return prev.map((m) =>
                      m.nombre === nuevoMaterial.trim()
                        ? { ...m, cantidad: m.cantidad + 1 }
                        : m
                    );
                  }
                  return [...prev, { nombre: nuevoMaterial.trim(), cantidad: 1 }];
                });
                setNuevoMaterial(""); // limpiar input
              }}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
            >
              Agregar
            </motion.button>
          </div>
        </motion.div>

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
