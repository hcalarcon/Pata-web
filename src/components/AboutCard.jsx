import { motion } from "framer-motion";

export default function AboutCards() {
  const cards = [
    {
      title: "Innovación",
      text: "Nos mantenemos actualizados con las últimas tecnologías.",
      color: "bg-yellow-300",
    },
    {
      title: "Compromiso",
      text: "Acompañamos cada proyecto como si fuera propio.",
      color: "bg-green-400",
    },
    {
      title: "Claridad",
      text: "Comunicación transparente en cada etapa.",
      color: "bg-blue-400",
    },
  ];

  // Variants para el contenedor (stagger)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // 0.2s entre cada card
      },
    },
  };

  // Variants para cada card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20">
      <motion.div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="relative bg-white rounded-2xl shadow-md p-8 overflow-hidden group transition-all duration-500 hover:shadow-xl"
          >
            <div
              className={`absolute -bottom-10 -left-10 w-32 h-32 ${card.color} rounded-full opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500`}
            />
            <h3 className="text-xl font-bold text-gray-800 relative z-10">
              {card.title}
            </h3>
            <p className="mt-3 text-gray-600 relative z-10">{card.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
