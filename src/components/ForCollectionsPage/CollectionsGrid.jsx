import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CollectionsCard from "./CollectionsCard";

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

const cardVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const ProductDetailsModal = ({ productsInCollection, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = productsInCollection[currentIndex];
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

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % productsInCollection.length);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + productsInCollection.length) % productsInCollection.length
    );
  };

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
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl z-50"
          >
            &times;
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="relative aspect-square bg-gray-900 border border-gray-700 mb-4 rounded overflow-hidden">
                <img
                  src={pictures[0]}
                  alt={title}
                  className="w-full h-full object-cover rounded"
                />

                {productsInCollection.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-1 top-1/2 -translate-y-1/2 backdrop-blur-md  bg-opacity-40 hover:bg-opacity-70 rounded-full text-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-1 top-1/2 -translate-y-1/2 backdrop-blur-md  bg-opacity-40 hover:bg-opacity-70 rounded-full text-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              <h2 className="text-lg font-bold mb-2">{title}</h2>
              <p className="text-sm text-gray-300 whitespace-pre-line">
                {cleanDescription}
              </p>

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
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function CollectionsGrid({ products }) {
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Извлечь название коллекции из description
  const extractCollectionFromDescription = (description) => {
    if (!description) return "N/A";
    const cleanDescription = description
      .replace(/^[\uFEFF\u00A0\u200B]+|^п»ї/, "")
      .trim();
    const match = cleanDescription.match(/коллекции\s+(.+?)\s+от/i);
    return match ? match[1].trim() : "N/A";
  };

  // Группируем продукты по коллекции
  const collectionsMap = new Map();

  products.forEach((product) => {
    const collection = extractCollectionFromDescription(product.description);
    if (!collectionsMap.has(collection)) {
      collectionsMap.set(collection, []);
    }
    collectionsMap.get(collection).push(product);
  });

  // Массив уникальных коллекций
  const uniqueCollections = Array.from(collectionsMap.entries());

  const handleCollectionClick = (collectionName) => {
    setSelectedCollection(collectionsMap.get(collectionName));
  };

  return (
    <div className="container mx-auto px-3 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 pb-10">
        {uniqueCollections.map(([collectionName, productsInCollection]) => (
          <div
            key={collectionName}
            onClick={() => handleCollectionClick(collectionName)}
            className="cursor-pointer"
          >
            <CollectionsCard
              title={collectionName}
              imageUrl={
                productsInCollection[0].pictures?.[0] || "/placeholder.jpg"
              }
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCollection && (
          <ProductDetailsModal
            productsInCollection={selectedCollection}
            onClose={() => setSelectedCollection(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
