
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

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

// Admin Pages
import Admin from "./pages/Admin";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ContentManager from "./pages/admin/ContentManager";
import ProductManager from "./pages/admin/ProductManager";
import SettingsManager from "./pages/admin/SettingsManager";
import FruitManager from "./pages/admin/FruitManager";

const queryClient = new QueryClient();

const App = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="fruit" element={<FruitManager />} />
                <Route path="products" element={<ProductManager />} />
                <Route path="settings" element={<SettingsManager />} />
              </Route>
              
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
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;
