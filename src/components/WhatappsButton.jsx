import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function WhatsAppFloating() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const presets = [
    "Hola, quiero presupuesto para una web.",
    "Necesito consultar sobre mantenimiento web.",
    "Quiero hablar sobre un proyecto de desarrollo.",
  ];

  const handleSend = (msg) => {
    const url = `https://wa.me/5493644277105?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // Detectar clicks fuera del panel
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-100">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 w-64 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col gap-2"
          >
            {presets.map((msg, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(msg)}
                className="bg-green-500 text-white px-3 py-2 rounded-xl text-left hover:bg-green-600 transition"
              >
                {msg}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="bg-green-500 p-4 rounded-full shadow-lg text-white text-2xl cursor-pointer"
      >
        💬
      </motion.button>
    </div>
  );
}
