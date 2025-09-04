import { useState, useEffect } from "react";

export default function SnowFall({ count = 200, ctaBoxRef }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SnowFlake key={i} ctaBoxRef={ctaBoxRef} />
      ))}
    </>
  );
}

function SnowFlake({ ctaBoxRef }) {
  // Genera un tamaño aleatorio **solo una vez al inicio**
  const [size] = useState(Math.random() * 6 + 2);
  const speed = Math.random() * 0.7 + 0.6;
  const [y, setY] = useState(() => -size - Math.random() * 500);
  const [x] = useState(Math.random() * 100);
  const [opacity] = useState(Math.random() * 0.5 + 0.5);
  const [isAccumulated, setIsAccumulated] = useState(false);
  const [accumulationTimer, setAccumulationTimer] = useState(0);

  const checkCollisionWithCTA = (snowX, snowY) => {
    if (!ctaBoxRef?.current) return false;

    const ctaRect = ctaBoxRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Convertir posición de la nieve de % a px
    const snowXPx = (snowX / 100) * viewportWidth;

    // Solo acumular si está dentro del ancho real de la caja
    const isInHorizontalRange =
      snowXPx >= ctaRect.left && snowXPx <= ctaRect.right;

    // Solo acumular si está justo encima de la caja
    const isAtTopOfCTA = snowY + size >= ctaRect.top && snowY <= ctaRect.top;

    return isInHorizontalRange && isAtTopOfCTA;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setY((prev) => {
        const nextY = prev + speed;

        // Colisión con la caja CTA
        if (checkCollisionWithCTA(x, nextY) && !isAccumulated) {
          setIsAccumulated(true);
          setAccumulationTimer(0);
          return nextY;
        }

        // Si está acumulada
        if (isAccumulated) {
          setAccumulationTimer((timer) => {
            const newTimer = timer + 1;
            if (newTimer > 180) {
              setIsAccumulated(false);
              setAccumulationTimer(0);
              // Forzar reinicio desde arriba
              setTimeout(() => setY(-size - Math.random() * 500), 10);
              return -size - Math.random() * 500;
            }
            return newTimer;
          });
          return prev;
        }

        // Si sale de la pantalla, reinicia
        if (nextY > window.innerHeight + size) {
          return -size - Math.random() * window.innerHeight;
        }

        return nextY;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [x, size, speed, isAccumulated]);

  return (
    <div
      className="absolute bg-white rounded-full pointer-events-none z-50"
      style={{
        width: size,
        height: size,
        top: y,
        left: `${x}%`,
        opacity: isAccumulated
          ? Math.max(0, 1 - accumulationTimer / 180) // se desvanece poco a poco
          : opacity,
      }}
    />
  );
}
