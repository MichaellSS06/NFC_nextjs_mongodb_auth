"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-black/40 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide text-white">
            🚀 MiLogo
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex gap-8">
            <a href="#home" className="hover:text-blue-400 transition">Inicio</a>
            <a href="#features" className="hover:text-blue-400 transition">Características</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contacto</a>
          </div>

          {/* Botón Hamburguesa */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú Móvil */}
        {open && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="md:hidden bg-black/90 px-6 py-4 flex flex-col gap-4"
          >
            <a href="#home" className="hover:text-blue-400 transition">Inicio</a>
            <a href="#features" className="hover:text-blue-400 transition">Características</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contacto</a>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative flex items-center justify-center text-center flex-1"
      >
        {/* Imagen de fondo */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?blur')",
          }}
        > */}
        <div className="absolute inset-0 -z-10">
            <Image
            src="/banner_isa.webp" // 👈 ruta desde /public
            alt="Fondo Hero"
            fill
            priority
            className="object-cover"
            />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Bienvenido a <span className="text-blue-400">Mi Landing</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Una landing page moderna con Next.js, TailwindCSS y animaciones fluidas.
          </p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#features"
            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-semibold shadow-lg"
          >
            Comenzar
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}


