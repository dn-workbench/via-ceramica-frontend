import React, { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal"; // путь может отличаться

const ProductCard = React.memo(function ProductCard({ product }) {
  const [showDetails, setShowDetails] = useState(false);

  const isOutOfStock = product.quantity === "0.000";
  const description = product.description || "";

  const cleanDescription = description
    .replace(/^[\uFEFF\u00A0\u200B]+|^п»ї/, "")
    .trim();
  const title = cleanDescription.split("-")[0]?.trim() || "N/A";

  const collectionMatch = cleanDescription.match(/коллекции\s+(.+?)\s+от/i);
  const factoryMatch = cleanDescription.match(/фабрики\s+([A-ZА-ЯЁ][^.\n]*)/i);

  const collection = collectionMatch?.[1]?.trim() || "N/A";
  const factory = factoryMatch?.[1]?.trim() || "N/A";

  return (
    <>
      <article
        className={`p-1 font-montserrat cursor-pointer ${
          isOutOfStock ? "opacity-70" : ""
        }`}
        onClick={() => setShowDetails(true)}
      >
        <div className="aspect-square bg-gray-50 border rounded-sm">
          <img
            src={product.pictures?.[0] || "/placeholder.jpg"}
            alt={title}
            className="w-full h-full object-cover rounded-sm"
            loading="lazy"
          />
        </div>

        <div className="mt-2">
          <h3 className="text-white text-left text-[14px] font-medium line-clamp-2">
            {title}
          </h3>
          <div className="my-2 h-px bg-gray-300" />

          <div className="grid grid-cols-2 gap-1 text-[12px]">
            <div className="text-gray-300 font-semibold">В наличии:</div>
            <div className="text-gray-400 font-light">
              {isOutOfStock ? "Недоступно" : `${product.quantity} м²`}
            </div>

            <div className="text-gray-300 font-semibold">Цена:</div>
            <div className="text-gray-400 font-light">
              {product.price} {product.currencyId}
            </div>

            <div className="text-gray-300 font-semibold">Фабрика:</div>
            <div className="text-gray-400 font-light">{factory}</div>

            <div className="text-gray-300 font-semibold">Коллекция:</div>
            <div className="text-gray-400 font-light">{collection}</div>
          </div>
        </div>
      </article>

      {showDetails && (
        <ProductDetailsModal
          product={product}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
});

export default ProductCard;
