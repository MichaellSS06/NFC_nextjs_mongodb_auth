"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-400 mb-6">
          Crear Cuenta
        </h1>

        <form className="space-y-5" onSubmit={(e) => {e.preventDefault(); // 👈 detiene el refresh
              console.log("Formulario enviado");
            }}>
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre completo"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Usuario</label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white shadow-lg transition"
          >
            Registrarme
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Inicia sesión
          </a>
        </p>
      </motion.div>
    </section>
  );
}
