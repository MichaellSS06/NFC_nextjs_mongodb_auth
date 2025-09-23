"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
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
            Bienvenido a <span className="text-blue-400">Registros de Equipos y Materiales</span>
          </h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-6">
            Una plataforma para registrar nuestros equipos por subestación, dar con su ubicación facilmente y verificar alertas relacionas a sus cantidades todo implementado con tecnología NFC.
          </p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="/registros"
            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-semibold shadow-lg"
          >
            Ver registros
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}


