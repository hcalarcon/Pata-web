import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Snowfall from "./Snowfall";

export default function HeroParallax() {
  const { scrollY } = useScroll();
  const ctaBoxRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Hook para detectar el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Variables responsivas basadas en el ancho de pantalla
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  // Ajustes responsivos para las transformaciones
  const sunRange = isMobile ? 300 : isTablet ? 450 : 600;
  const treeRange = isMobile ? -100 : isTablet ? -125 : -150;
  const bushRange = isMobile ? 100 : isTablet ? 125 : 150;

  // Sol en arco semicircular - ajustado para mobile
  const xSun = useTransform(scrollY, [0, 800], [0, sunRange]);
  const ySun = useTransform(
    scrollY,
    [0, 400, 800],
    isMobile ? [50, -60, 150] : [70, -100, 200]
  );

  // Texto -> baja suave, menos movimiento en mobile
  const yText = useTransform(scrollY, [0, 400], isMobile ? [0, 100] : [0, 150]);

  // Montañas -> bajan suave, menos en mobile
  const yMountains = useTransform(
    scrollY,
    [0, 400],
    isMobile ? [0, 50] : [0, 80]
  );

  // Árboles / arbusto - rangos responsivos
  const xTree = useTransform(scrollY, [0, 500], [0, treeRange]);
  const xBush = useTransform(scrollY, [0, 500], [0, bushRange]);

  return (
    <section className="bg-gradient-to-b from-sky-200 via-sky-300 to-sky-500 relative w-full h-screen overflow-hidden">
      {/* <Snowfall client:only="react" ctaBoxRef={ctaBoxRef} /> */}

      {/* ☀️ Sol - tamaño responsivo */}
      <motion.div
        className={`absolute top-10 left-0 rounded-full bg-white/70 blur-md z-30 ${
          isMobile ? "w-24 h-24 top-55" : isTablet ? "w-32 h-32" : "w-40 h-40"
        }`}
        style={{ x: xSun, y: ySun }}
      />

      {/* Texto central - padding y tamaños responsivos */}
      <motion.div
        ref={ctaBoxRef}
        id="cta-box"
        className={`absolute left-1/2 p-3 -translate-x-1/2 
             bg-white/20 flex flex-col backdrop-blur-lg 
             rounded-2xl shadow-lg items-center text-center z-20 
              ${
                isMobile
                  ? "top-64 p-1 max-w-sm w-[90%]"
                  : isTablet
                  ? "top-50 p-5 max-w-md w-auto"
                  : "top-25 p-6 max-w-lg w-auto"
              }`}
        style={{ y: yText }}
      >
        <h1
          className={`font-bold text-white drop-shadow-lg ${
            isMobile
              ? "text-2xl sm:text-3xl"
              : isTablet
              ? "text-4xl"
              : "text-4xl md:text-5xl"
          }`}
        >
          Impulsa tu negocio en la web
        </h1>

        <p
          className={`mt-4 text-white/90 ${
            isMobile
              ? "text-base max-w-xs"
              : isTablet
              ? "text-lg max-w-sm"
              : "text-lg md:text-lg max-w-md"
          }`}
        >
          Creamos sitios modernos, rápidos y optimizados para que tu negocio
          destaque.
        </p>

        <div
          className={`flex flex-wrap justify-center gap-3 ${
            isMobile ? "mt-4" : "mt-6"
          }`}
        >
          <a
            href="#nosotros"
            className={`rounded-2xl bg-white/80 text-sky-700 font-semibold shadow-md hover:bg-white transition ${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            }`}
          >
            Conocenos
          </a>
          <a
            href="#contacto"
            className={`rounded-2xl bg-sky-700 text-white font-semibold shadow-md hover:bg-sky-800 transition ${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            }`}
          >
            Contacto
          </a>
        </div>
      </motion.div>

      {/* Montañas - altura ajustada para mobile */}
      <motion.img
        src="/svg/mountains-2.svg"
        alt=""
        className={`absolute bottom-0 w-full object-cover z-10 pointer-events-none ${
          isMobile ? "h-170 transform  sm:h-1" : "h-auto"
        }`}
        style={{ y: yMountains }}
      />
      <motion.img
        src="/svg/mountains-1.svg"
        alt=""
        className={`absolute bottom-0 w-full object-cover z-20 pointer-events-none ${
          isMobile ? "h-170 sm:h-44" : "h-auto"
        }`}
        style={{ y: yMountains }}
      />
      <motion.img
        src="/svg/mountain.svg"
        alt=""
        className={`absolute pointer-events-none bottom-0 w-full object-cover z-30 ${
          isMobile ? "h-90 sm:h-48" : "h-auto"
        }`}
        style={{ y: yMountains }}
      />

      {/* Árboles base */}
      <img
        src="/svg/arboles.svg"
        alt=""
        className={`absolute pointer-events-none bottom-0 w-full z-40 object-cover ${
          isMobile ? "h-54 sm:h-32" : "h-auto"
        }`}
      />

      {/* Árbol lateral - tamaño y posición responsiva */}
      <motion.img
        src="/svg/arbol.svg"
        alt=""
        className={`absolute pointer-events-none bottom-0 left-0 object-cover z-50 transform ${
          isMobile
            ? "w-[450px] sm:w-[400px] -translate-x-1/2"
            : isTablet
            ? "w-[500px] -translate-x-3/5"
            : "w-[700px] -translate-x-2/3"
        }`}
        style={{ x: xTree }}
      />

      {/* Arbusto lateral - tamaño y rotación responsiva */}
      <motion.img
        src="/svg/arbusto.svg"
        alt=""
        className={`absolute pointer-events-none bottom-0 right-0 object-cover z-50 transform ${
          isMobile
            ? "w-[170px] sm:w-[120px] rotate-[-10deg] translate-x-1/4"
            : isTablet
            ? "w-[150px] rotate-[-12deg] translate-x-1/3"
            : "w-[200px] rotate-[-15deg] translate-x-1/3"
        }`}
        style={{ x: xBush }}
      />
    </section>
  );
}
