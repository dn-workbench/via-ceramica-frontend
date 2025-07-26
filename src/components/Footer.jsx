const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MyShop</h3>
            <p className="text-gray-400">
              Лучший магазин товаров для вашего дома
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@myshop.com</li>
              <li>Телефон: +7 (123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Меню</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Главная
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Каталог
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  О нас
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} MyShop. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
