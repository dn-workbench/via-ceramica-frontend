useEffect(() => {
  fetch("https://web-production-1c9e.up.railway.app/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      const uniqueVendors = [...new Set(data.map((p) => p.vendor))];
      setVendors(uniqueVendors);
      setSelectedVendor(uniqueVendors[0]);
    });
}, []);
