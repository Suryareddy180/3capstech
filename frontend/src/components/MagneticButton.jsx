import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// Magnetic button that follows the cursor slightly.
export default function MagneticButton({ children, className = "", as = "button", ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const Comp = motion[as] || motion.button;
  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
