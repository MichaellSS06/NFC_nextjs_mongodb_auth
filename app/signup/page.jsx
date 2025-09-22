"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import usersService from "@/services/users"
import loginService from "@/services/login";
import registroService from "@/services/registros";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function SignupPage() {
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [usernameSignup, setUsernameSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null)
  const { login } = useAuth();


  const handleSignUp = async (event) =>{
    event.preventDefault()
    try {
      const newUser = await usersService.signup({
        username: usernameSignup,
        name: name,
        password: passwordSignup
      })

      const userfromApi = await loginService.login({
        username: usernameSignup,
        password: passwordSignup
      })

      login(userfromApi)

      //registroService.setToken(userfromApi.token)

      router.push("/");
      
    } catch (e) { // eslint-disable-line
      setErrorMessage('Failed sign up')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

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

        <form className="space-y-5" onSubmit={handleSignUp}>
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre</label>
            <input
              value={name}
              onChange={({target})=>setName(target.value)}
              type="text"
              placeholder="Tu name completo"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Usuario</label>
            <input
              value={usernameSignup}
              onChange={({target})=>setUsernameSignup(target.value)}
              type="text"
              placeholder="Nombre de usuario"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <div className="relative">
              <input
                value={passwordSignup}
                onChange={({target})=>setPasswordSignup(target.value)}
                type={showPasswordSignup ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
                onClick={() => setShowPasswordSignup(!showPasswordSignup)}
              >
                {showPasswordSignup ? <EyeOff size={20} /> : <Eye size={20} />}
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

        {errorMessage && <p className="mt-6 text-center text-sm text-red-600">
          {errorMessage}
        </p>}

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
