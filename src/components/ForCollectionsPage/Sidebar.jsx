import { useRef } from "react";

export const Sidebar = ({ factories, selectedFactory, onSelectFactory }) => {
  const containerRef = useRef(null);

  const filteredFactories = factories
    .filter((factory) => factory !== "Производитель не указан")
    .map((factory) => factory.toUpperCase());

  const upperSelectedFactory = selectedFactory?.toUpperCase();

  return (
    <div
      className="px-4 py-2"
      style={{ fontFamily: "'LotusEater', sans-serif" }}
    >
      <h2 className="text-lg font-medium mt-10 mb-3 tracking-wider">FABRIC</h2>

      <div
        ref={containerRef}
        className="flex space-x-8 overflow-x-auto w-full pb-2 hide-scrollbar"
      >
        {filteredFactories.map((factory) => (
          <button
            key={factory}
            className={`flex-shrink-0 whitespace-nowrap transition-colors text-base ${
              upperSelectedFactory === factory
                ? "text-white font-semibold"
                : "text-gray-400 hover:text-gray-800"
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            onClick={() => onSelectFactory(factory)}
          >
            {factory}
          </button>
        ))}
      </div>
    </div>
  );
};
