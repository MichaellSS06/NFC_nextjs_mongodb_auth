"use client"
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const { user, setRedirectTo, logout } = useAuth();
    const router = useRouter();

    const handleClick = (ruta, event) => {
    if (!user) {
        event.preventDefault();
        setRedirectTo(ruta);
        router.push("/login");
    } else {
        router.push(ruta);
    }
    };

    return (
        <>
            {/* Navbar */}
        <nav className="fixed w-full top-0 left-0 z-50 bg-black/40 backdrop-blur-md shadow-md">
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-wide text-white">
                🚀 MiLogo
            </Link>
         
            {/* Links Desktop */}
            <div className="hidden md:flex gap-8">
            <Link onClick={(event) => handleClick("/registros", event)} href="/registros" className="hover:text-blue-400 transition">Registros</Link>
            <Link onClick={(event) => handleClick("/crear_registro", event)} href="/crear_registro" className="hover:text-blue-400 transition">Crear Registro</Link>
            {user ? 
                <>
                <p>Hola {user.name}</p>
                <Link onClick={logout} href="/" className="hover:text-blue-400 transition">Log Out</Link>
                </>
                :
                <>
                <Link href="/signup" className="hover:text-blue-400 transition">Sign Up</Link>
                <Link href="/login" className="hover:text-blue-400 transition">Log In</Link>
                </>
                }
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
                <Link onClick={(event) => handleClick("/registros", event)} href="/registros" className="hover:text-blue-400 transition">Registros</Link>
                <Link onClick={(event) => handleClick("/crear_registro", event)} href="/crear_registro" className="hover:text-blue-400 transition">Crear Registro</Link>
                {user ? 
                    <>
                    <p>Hola {user.name}</p>
                    <Link onClick={logout} href="/" className="hover:text-blue-400 transition">Log Out</Link>
                    </>
                    :
                    <>
                    <Link href="/signup" className="hover:text-blue-400 transition">Sign Up</Link>
                    <Link href="/login" className="hover:text-blue-400 transition">Log In</Link>
                    </>
                }
            </motion.div>
        )}
        </nav>
        </>
)
}

