import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CollectionsPage from "./pages/CollectionsPage";
import MobileNavBar from "./components/MobileNavBar";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<CollectionsPage />} />
        </Routes>
        <MobileNavBar />
      </div>
    </Router>
  );
}

export default App;
