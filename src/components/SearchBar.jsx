import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Поиск" }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-1">
      <div className="relative">
        {/* ЯРКИЙ градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-r rounded-lg opacity-90"></div>
        <input
          type="text"
          placeholder={placeholder}
          className="relative w-full py-3 pl-10 pr-4 rounded-lg bg-transparent backdrop-blur-md border border-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all placeholder-white/50 text-white/60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            textShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}
        />

        {/* Иконка поиска */}
        <div className="absolute left-3 top-3.5 text-white/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Кнопка очистки */}
        {searchTerm && (
          <button
            type="button"
            className="absolute right-3 top-3 text-white transition-colors"
            onClick={() => setSearchTerm("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
