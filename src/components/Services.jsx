import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ServicesSection() {
  const services = [
    {
      title: "Diseño y Desarrollo Web",
      text: "Landing, corporativas, catálogos de productos.",
      time: "2-4 semanas",
      price: "Desde $150000",
    },
    {
      title: "Web Apps",
      text: "Aplicaciones web modernas con funcionalidades avanzadas.",
      time: "4-8 semanas",
      price: "Desde $350000",
    },
    {
      title: "Mantenimiento",
      text: "Soporte y actualizaciones para sitios propios o de terceros.",
      time: "Mensual",
      price: "Desde $20000",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = adelante, -1 = atrás

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % services.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  return (
    <motion.section
      id="servicios"
      className="relative w-full flex justify-center items-center py-16 px-5 h-full bg-gradient-to-b from-[#0A2E4D] to-[#99dae1] text-white"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center">
        {/* Lado Izquierdo: Cards Apiladas */}
        <motion.div
          className="relative w-70 h-85 flex m-auto items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {services.map((s, i) => {
            const isActive = i === index;
            const offsetY = -10 * i; // separación vertical
            const rotate = -5 + i * 3; // rotación leve
            const scale = isActive ? 1 : 0.9; // la activa se ve más grande

            return (
              <motion.div
                key={i}
                style={{ zIndex: isActive ? 10 : i }} // activa encima de todas
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  y: offsetY,
                  rotate: rotate,
                  scale: scale,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`absolute w-64 h-64 flex items-center justify-center p-4 rounded-2xl shadow-lg
          ${
            isActive
              ? "bg-blue-500/90 text-white"
              : "bg-white/10 backdrop-blur-md border border-white/20 text-white"
          }`}
                onClick={() => setIndex(i)} // opcional: click para seleccionar
              >
                <h3 className="text-lg font-bold text-center">{s.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Lado Derecho: Descripción animada */}
        <div className="relative w-full h-80">
          <AnimatePresence mode="wait" custom={direction}>
            <div className="absolute transform rotate-1 w-full h-full p-6 bg-white/10 backdrop-blur-md text-gray-800 rounded-2xl shadow-lg">
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="transform -rotate-1 p-3"
              >
                <h3 className="text-2xl font-bold">{services[index].title}</h3>
                <p className="mt-3 text-gray-900">{services[index].text}</p>
                <p className="mt-2 text-sm text-gray-800">
                  Tiempo estimado: {services[index].time}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  Costo: {services[index].price}
                </p>
              </motion.div>
            </div>
          </AnimatePresence>

          {/* Botones */}
          <div className="absolute bottom-5 left-5 flex gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-700 transition"
            >
              &lt;
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-700 transition"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
