import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function MobileNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/collections" ? "collections" : "home"
  );

  useEffect(() => {
    setActiveTab(location.pathname === "/collections" ? "collections" : "home");
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === "collections" ? "/collections" : "/");
  };

  const tabs = [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 flex justify-center items-end pb-4 h-22" // Уменьшил высоту с h-24 до h-22
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative flex justify-center items-center h-full">
        {/* Фон с градиентом и blur-эффектом */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t to-transparent "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Контейнер кнопок - уменьшил высоту с h-16 до h-14 */}
        <div className="relative flex items-center h-14 px-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative z-10 px-6 py-2 text-[14px] font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-inner"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Анимированный фон активной кнопки */}
          <motion.div
            className="absolute left-0 h-full rounded-full bg-gradient-to-r shadow-lg"
            initial={false}
            animate={{
              left: activeTab === "home" ? "4px" : "calc(50% - 4px)",
              width: "calc(50% - 8px)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Декоративные элементы */}
        <div className="absolute bottom-full left-0 right-0 h-4 flex justify-center"></div>
      </div>
    </motion.div>
  );
}
