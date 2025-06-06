
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Fruit from "./pages/Fruit";
import Visit from "./pages/Visit";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Merchandise from "./pages/Merchandise";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from './components/ScrollToTop'; // New import

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* New component instance */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Index />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/fruit" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Fruit />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/visit" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Visit />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/merchandise" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Merchandise />
              </main>
              <Footer />
            </div>
          } />
          <Route path="*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <NotFound />
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
};

export default App;
