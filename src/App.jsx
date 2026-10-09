import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <div className="relative z-20 bg-black">
        <Footer />
      </div>
    </div>
  );
}
