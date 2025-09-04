import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "María G.",
    text: "Hernaldo trabaja con mucha claridad y paciencia.",
  },
  { name: "Lucas P.", text: "Su compromiso con cada proyecto es admirable." },
  {
    name: "Sofía R.",
    text: "Tiene innovación y creatividad en las soluciones.",
  },
  {
    name: "Carlos T.",
    text: "Un colega que siempre busca la mejor opción tecnológica.",
  },
  { name: "Ana M.", text: "Su atención al detalle es excelente." },
  {
    name: "Jorge F.",
    text: "Me sorprendió la rapidez con la que entrega resultados.",
  },
  { name: "Clara V.", text: "Muy profesional en cada paso del trabajo." },
  { name: "Martín L.", text: "Siempre propone ideas innovadoras." },
  { name: "Elena B.", text: "Un gran aliado en proyectos digitales." },
  { name: "Pablo K.", text: "Muy responsable y dedicado." },
];

export default function ReviewBubbles() {
  const [visible, setVisible] = useState([]);

  const getRandomReviews = (n) => {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, n);

    // posiciones para desktop
    const desktopPositions = [
      { top: "20%", left: "20%" },
      { top: "20%", left: "60%" },
      { top: "50%", left: "25%" },
      { top: "50%", left: "65%" },
      { top: "70%", left: "40%" },
    ];

    return selected.map((r, i) => ({
      ...r,
      ...desktopPositions[i % desktopPositions.length],
      id: i + Math.random(),
    }));
  };

  useEffect(() => {
    setVisible(getRandomReviews(5));
    const interval = setInterval(() => {
      setVisible(getRandomReviews(5));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[linear-gradient(rgba(44,44,44,0.4),rgba(0,0,0,0.5)),url('/fondo.jpg')] bg-cover bg-center bg-fixed px-4">
      {/* Título arriba */}
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-12 text-center mt-6 md:mt-12 relative">
        Qué dicen nuestros{" "}
        <span className="relative inline-block text-red-300">
          clientes
          <motion.span
            className="absolute left-0 top-1/2 h-[2px] bg-red-400 w-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </span>{" "}
        colegas y amigos
      </h2>

      {/* Contenedor de burbujas */}
      <div className="relative min-h-[500px] w-full h-full mt-1 ">
        <AnimatePresence>
          {visible.map((r, i) => (
            <motion.div
              key={r.id}
              className="absolute md:flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-lg text-center p-4 md:p-6 max-w-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
              style={
                window.innerWidth < 768
                  ? {
                      top: `${5 + i * 18}%`,
                      left: i % 2 === 0 ? "10%" : "auto",
                      right: i % 2 !== 0 ? "10%" : "auto",
                    }
                  : { top: r.top, left: r.left }
              }
            >
              <div>
                <p className="text-sm font-medium text-white">{r.text}</p>
                <span className="block mt-2 text-xs text-blue-300">
                  — {r.name}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
