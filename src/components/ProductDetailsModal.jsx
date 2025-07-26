import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modal = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

const ProductDetailsModal = ({ product, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) return null;

  const description = product.description || "";
  const cleanDescription = description
    .replace(/^[\uFEFF\u00A0\u200B]+|^п»ї/, "")
    .trim();
  const title = cleanDescription.split("-")[0]?.trim() || "N/A";

  const collectionMatch = cleanDescription.match(/коллекции\s+(.+?)\s+от/i);
  const factoryMatch = cleanDescription.match(/фабрики\s+([A-ZА-ЯЁ][^.\n]*)/i);

  const collection = collectionMatch?.[1]?.trim() || "N/A";
  const factory = factoryMatch?.[1]?.trim() || "N/A";

  const pictures = product.pictures?.length
    ? product.pictures
    : ["/placeholder.jpg"];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-5"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="relative rounded-xl shadow-2xl max-w-md w-full pt-12 pb-5 px-5"
          style={{ backgroundColor: "rgba(15, 14, 14, 1)", color: "#fff" }}
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl z-50"
          >
            &times;
          </button>

          {/* Изображение (без свайпа) */}
          <div className="aspect-square bg-gray-900 border border-gray-700 mb-4 rounded overflow-hidden">
            <img
              src={pictures[currentIndex]}
              alt={title}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Название и описание */}
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {cleanDescription}
          </p>

          {/* Остальная информация */}
          <div className="mt-4 space-y-1 text-sm">
            <div>
              <strong>Цена:</strong> {product.price} {product.currencyId}
            </div>
            <div>
              <strong>В наличии:</strong> {product.quantity} м²
            </div>
            <div>
              <strong>Фабрика:</strong> {factory}
            </div>
            <div>
              <strong>Коллекция:</strong> {collection}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
