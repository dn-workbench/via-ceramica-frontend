import { useEffect, useState } from "react";
import { Sidebar } from "../components/ForCollectionsPage/Sidebar";
import CollectionsGrid from "../components/ForCollectionsPage/CollectionsGrid";

function extractVendor(description) {
  const match = description?.match(/от итальянской фабрики\s+([^\n\.]+)/i);
  if (match) {
    return match[1].trim().toUpperCase();
  }
  return "Производитель не указан";
}

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem("products");

    const processProducts = (items) => {
      const processed = items.map((p) => ({
        ...p,
        vendor: extractVendor(p.description),
      }));

      setProducts(processed);

      const uniqueVendors = [...new Set(processed.map((p) => p.vendor))];
      setVendors(uniqueVendors);
      setSelectedFactory((prev) => prev || uniqueVendors[0]);
    };

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          processProducts(parsed);
          setLoading(false);
        }
      } catch (e) {
        console.warn("Ошибка чтения кэша:", e);
      }
    }

    fetch("https://web-production-1c9e.up.railway.app/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];

        const cachedString = localStorage.getItem("products");
        const isDifferent = JSON.stringify(items) !== cachedString;

        if (isDifferent || !cached) {
          localStorage.setItem("products", JSON.stringify(items));
          processProducts(items);
        }

        setError(null);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
        setError("Не удалось загрузить данные");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen text-white/60 p-6">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen text-red-500 text-center py-6">{error}</div>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.vendor === selectedFactory
  );

  const collections = Array.from(
    new Map(
      filteredProducts.map((item) => [item.vendorCode + item.model, item])
    ).values()
  );

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <Sidebar
          factories={vendors}
          selectedFactory={selectedFactory}
          onSelectFactory={setSelectedFactory}
        />
        <CollectionsGrid products={collections} />
      </div>
    </div>
  );
}
