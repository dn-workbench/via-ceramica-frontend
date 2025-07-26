import { useEffect, useRef, useState, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], loading }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef(null);

  // Сброс при изменении продуктов
  useEffect(() => {
    setVisibleCount(20);
  }, [products]);

  // Lazy loading
  useEffect(() => {
    if (products.length <= visibleCount) return; // Всё уже загружено

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 20, products.length));
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [visibleCount, products]);

  // Сортируем продукты: сначала с quantity != "0.000", потом с "0.000"
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const aOut = a.quantity === "0.000" ? 1 : 0;
      const bOut = b.quantity === "0.000" ? 1 : 0;
      return aOut - bOut; // сначала 0, потом 1
    });
  }, [products]);

  const displayed = sortedProducts.slice(0, visibleCount);

  if (!displayed.length && !loading) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-1 gap-y-10">
        {displayed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Индикатор загрузки */}
      <div ref={loaderRef} className="py-10 text-center text-gray-400">
        {visibleCount < sortedProducts.length
          ? "Загрузка..."
          : "Все загружено1"}
      </div>
    </div>
  );
}
