import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем из localStorage при первом запуске
  useEffect(() => {
    const cached = localStorage.getItem("products");

    if (cached) {
      try {
        const data = JSON.parse(cached);
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
          setLoading(false); // Отображаем сразу
        }
      } catch (e) {
        console.warn("Ошибка чтения из localStorage:", e);
      }
    }

    // Далее обновляем в фоне
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://via-ceramica-api.vercel.app/api/products"
        );
        const data = response.data?.products || response.data || [];

        if (!Array.isArray(data)) {
          throw new Error("Некорректный формат данных");
        }

        const cachedString = localStorage.getItem("products");
        const isDifferent = JSON.stringify(data) !== cachedString;

        if (isDifferent) {
          setProducts(data);
          setFilteredProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        }

        // Если до этого не было кэша
        if (!cached) {
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setError(err.message);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Поиск
  useEffect(() => {
    if (!Array.isArray(products)) return;

    const results = products.filter((product) => {
      const term = searchTerm.toLowerCase();
      return (
        product?.name?.toLowerCase().includes(term) ||
        product?.description?.toLowerCase().includes(term) ||
        product?.id?.toString().includes(term) ||
        product?.vendorCode?.toLowerCase().includes(term) ||
        product?.vendor?.toLowerCase().includes(term) ||
        product?.params?.Цвет?.toLowerCase().includes(term) ||
        product?.params?.Формат?.toLowerCase().includes(term)
      );
    });

    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Поиск..."
        />

        {error ? (
          <div className="text-center py-8 text-red-500">Ошибка: {error}</div>
        ) : (
          <>
            <ProductGrid products={filteredProducts} loading={loading} />

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                {searchTerm ? (
                  <>Товары не найдены. Попробуйте изменить поисковый запрос.</>
                ) : (
                  <>Нет доступных товаров</>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
