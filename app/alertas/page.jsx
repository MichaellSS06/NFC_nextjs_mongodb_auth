import alertaService from "@/services/alertas";
import { useState } from "react";
import { staggeredAnimation } from "../registros/page";

export default function AlertasPage() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAlertas = async () => {
      setLoading(true);
      try {
      const res = await alertaService.getAll();
      setAlertas(res);
      } catch (error) {
      console.error("Error al cargar alertas:", error);
      } finally {
      setLoading(false);
      }
    };
    
    fetchAlertas();
    }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alertas.map((alerta, i) => (
            <motion.div
              key={alerta.id}
              initial="hidden"
              animate="visible"
              variants={staggeredAnimation(i)}
              className="p-[3px] rounded-2xl bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400"
            >
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              {/* Encabezado */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {alerta.mensaje}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(alerta.fecha).toLocaleString()}
                </span>
              </div>

              {/* Usuario */}
              <div className="border-t pt-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Registrado por:</span>{" "}
                  {alerta.nombre} (@{alerta.cantidadActual}) (@{alerta.cantidadRegistro})
                </p>
              </div>

              {/* CTA / acciones pequeñas */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-sm text-gray-500">SE: {alerta.subestacion}</div>
                <div className="text-sm text-gray-500">ID: {alerta.status}</div>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}


