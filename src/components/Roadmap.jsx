import { motion } from "framer-motion";

const steps = [
  {
    title: "Reunión inicial",
    desc: "Escuchamos tus ideas y objetivos.",
    icon: "💬",
  },
  {
    title: "Diseño & validación",
    desc: "Prototipamos y definimos el look & feel.",
    icon: "🎨",
  },
  {
    title: "Desarrollo",
    desc: "Construcción optimizada y adaptable.",
    icon: "💻",
  },
  {
    title: "Lanzamiento & soporte",
    desc: "Tu web lista para crecer.",
    icon: "🚀",
  },
];

export default function Roadmap() {
  return (
    <section className="relative py-20 px-5 bg-gradient-to-b from-[#243a3c] to-[#022B44]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-white text-3xl mb-4">Creemos en el proceso</h2>
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`relative flex items-center mb-12 ${
              i % 2 === 0 ? "justify-end" : "justify-start"
            }`}
          >
            {/* Línea punteada */}
            {i < steps.length - 1 && (
              <div className="absolute left-1/2 top-full w-px h-12 border-l-2 border-dashed border-white opacity-40" />
            )}

            {/* Contenido del paso */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 w-72 text-center">
              <div className="text-3xl mb-2">{step.icon}</div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-sm text-gray-200">{step.desc}</p>
            </div>

            {/* Nodo central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-700 hidden sm:block rounded-full border-2 border-white" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
