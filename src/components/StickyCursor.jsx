import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function StickyCursor() {
  const cursorSize = 150;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 50, stiffness: 250, mass: 0.6 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      className="pointer-events-none fixed left-0 top-0 -z-20 hidden aspect-square w-[150px] rounded-full bg-gold/20 blur-xl lg:block"
    ></motion.div>
  );
}
