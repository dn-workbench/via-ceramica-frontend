export async function fetchProducts() {
  try {
    const response = await fetch(
      "https://via-ceramica-api.vercel.app/api/products",
      {
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    const data = await response.json();
    const productsArray = Array.isArray(data) ? data : data.products || [];
    return productsArray;
  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
    throw error;
  }
}
