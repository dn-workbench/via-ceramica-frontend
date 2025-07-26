import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <header
      className="relative w-full bg-no-repeat bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: "url(/image/HeadImage.jpg)",
        height: "100vh",
        fontFamily: "'LotusEater', sans-serif",
      }}
    >
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Градиент для плавного растворения внизу */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(15,14,14,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
        <motion.div className="inline-block">
          <motion.h1
            className="text-2xl md:text-5xl font-light mb-2"
            style={{
              letterSpacing: "0.5rem",
              lineHeight: "1.5",
              textTransform: "uppercase",
            }}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            VIA CERAMICA
          </motion.h1>
          <motion.div
            className="h-0.5 bg-white/60 mx-auto"
            style={{ maxWidth: "70%" }}
            initial="hidden"
            animate="visible"
            variants={underlineVariants}
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
