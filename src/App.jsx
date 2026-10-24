
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App() {
  const location = useLocation();

  // Hide the footer only on the Menu page.
  const isMenuPage =
    location.pathname.replace(/\/+$/, "") === "/menu";

  return (
    <div className="relative min-h-screen bg-black">
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      {/* Show footer on every page except Menu */}
      {!isMenuPage && (
        <div className="relative z-20 bg-black">
          <Footer />
        </div>
      )}
    </div>
  );
}
