import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ContactCTA() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // Cerrar modal al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="h-50 bg-gradient-to-b from-[#5080aa] to-[#99dae1]  text-white flex items-center justify-center p-10">
      {/* CTA principal */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          relative z-160 
          bg-gradient-to-r from-green-500 to-blue-600 
          text-white font-bold 
          px-8 py-4 
          rounded-full 
          shadow-xl 
          cursor-pointer
          flex items-center justify-center
          transition-all
          w-auto
          md:w-72
        "
      >
        <span className="hidden md:block">✉️ Hablemos de tu proyecto</span>
        <span className="md:hidden">✉️</span>
        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl animate-ping -z-10"></div>
      </motion.button>

      {/* Modal con formulario */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white text-black p-8 rounded-2xl shadow-xl w-[90%] max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">
                Contáctame
              </h3>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="p-3 rounded-md border"
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  className="p-3 rounded-md border"
                />
                <textarea
                  placeholder="Tu mensaje"
                  className="p-3 rounded-md border h-32"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-md hover:opacity-90"
                >
                  Enviar
                </button>
              </form>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 text-sm text-gray-600 hover:text-black block mx-auto"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
