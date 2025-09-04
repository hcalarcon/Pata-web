import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null); // ✅ Agregamos ref para el botón

  useEffect(() => {
    const handleScroll = () => {
      if (open) setOpen(false); // cierra el menú al hacer scroll
    };

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;

      // Cambia el nav a sólido a partir de 50px
      setSolid(y > 50);

      // 🔽 Acá podés cambiar la altura a gusto (ahora está en 200px)
      if (y > lastY && y > 400) setHidden(true);
      else setHidden(false);

      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  // Cerrar si se hace click afuera
  useEffect(() => {
    const handleClick = (e) => {
      // ✅ Excluimos tanto el menú como el botón
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Nav con blur o sólido
  const navBg = solid
    ? "bg-[#011F10] shadow-white/20 "
    : "backdrop-blur-xl bg-black/20";

  // Fondo menú según estado del nav
  const menuBg = solid
    ? "bg-[#012b1a]/90 backdrop-blur-sm"
    : "bg-black/20 backdrop-blur-lg";

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-[200] ${navBg} 
                  px-6 py-3 flex items-center justify-between`}
    >
      {/* Logo */}
      <a href="#top" className="flex items-center gap-2 select-none">
        <img src="svg/logo.svg" alt="logo" className="w-9 h-9" />
        <p className="text-blue-600 font-bold text-xl">
          PATA <span className="text-green-600">web</span>
        </p>
      </a>

      {/* Links Desktop */}
      <div className="hidden md:flex gap-6 text-white/90 font-medium ">
        <a href="#inicio" className="hover:text-white transition">
          Inicio
        </a>
        <a href="#nosotros" className="hover:text-white transition">
          Nosotros
        </a>
        <a href="#servicios" className="hover:text-white transition">
          Servicios
        </a>
        <a href="#contacto" className="hover:text-white transition">
          Contacto
        </a>
      </div>

      <button
        ref={buttonRef}
        className="md:hidden relative z-[220] p-1 flex flex-col gap-2 items-center justify-center"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={(e) => {
          e.preventDefault(); // ✅ Prevenir comportamiento por defecto
          e.stopPropagation(); // ✅ Evitar burbujeo
          setOpen((prev) => !prev);
        }}
      >
        <span
          className={`block h-[3px] bg-white rounded transition-all duration-300 ${
            open ? "w-6 rotate-45 translate-y-2" : "w-[18px]"
          }`}
        />
        <span
          className={`block h-[3px] bg-white rounded transition-all duration-300 ${
            open ? "opacity-0" : "w-[25px]"
          }`}
        />
        <span
          className={`block h-[3px] bg-white rounded transition-all duration-300 ${
            open ? "w-6 -rotate-45 -translate-y-2" : "w-[18px]"
          }`}
        />
      </button>

      {/* Menú Mobile */}
      <AnimatePresence>
        {open && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className={`absolute top-full left-0 right-0 z-[210]
                ${menuBg} p-6
                flex flex-col gap-4 items-end text-white font-semibold shadow-lg rounded-bl-full`}
          >
            {["#inicio", "#nosotros", "#servicios", "#contacto"].map(
              (href, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="hover:text-sky-300 transition"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  {href.replace("#", "").charAt(0).toUpperCase() +
                    href.slice(2)}
                </motion.a>
              )
            )}
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
