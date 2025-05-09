import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { cartItemCount } = useCart();
  const location = useLocation();

  // Monitor window scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Fruit", href: "/fruit" },
    { name: "Merchandise", href: "/merchandise" },
    { name: "Visit", href: "/visit" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-peach">
          Moffatt Ranch
        </Link>

        {/* Mobile Menu */}
        {isMobile && (
          <>
            <div className="flex items-center">
              <Link to="/cart" className="mr-6 relative">
                <ShoppingBag className="h-6 w-6 text-ranch-dark" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-peach text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>
              <button
                className="text-ranch-dark"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>
            )}

            {/* Mobile menu drawer */}
            <div
              className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="p-6">
                <div className="flex justify-end">
                  <button
                    onClick={closeMenu}
                    className="text-gray-500 hover:text-gray-800"
                    aria-label="Close menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <nav className="mt-8">
                  <ul className="space-y-4">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`block py-2 ${
                            location.pathname === item.href
                              ? "text-peach font-medium"
                              : "text-gray-800 hover:text-peach"
                          }`}
                          onClick={closeMenu}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/cart"
                        className={`block py-2 flex items-center ${
                          location.pathname === "/cart"
                            ? "text-peach font-medium"
                            : "text-gray-800 hover:text-peach"
                        }`}
                        onClick={closeMenu}
                      >
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Cart
                        {cartItemCount > 0 && (
                          <span className="ml-2 bg-peach text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartItemCount > 9 ? '9+' : cartItemCount}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/order-tracking"
                        className={`block py-2 ${
                          location.pathname === "/order-tracking"
                            ? "text-peach font-medium"
                            : "text-gray-800 hover:text-peach"
                        }`}
                        onClick={closeMenu}
                      >
                        Track Order
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </>
        )}

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="flex items-center">
            <nav>
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`nav-link ${
                        location.pathname === item.href
                          ? "text-peach font-medium"
                          : "text-ranch-dark hover:text-peach"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/order-tracking"
                    className={`nav-link ${
                      location.pathname === "/order-tracking"
                        ? "text-peach font-medium"
                        : "text-ranch-dark hover:text-peach"
                    }`}
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </nav>
            <Link to="/cart" className="ml-8 relative">
              <ShoppingBag className="h-6 w-6 text-ranch-dark hover:text-peach transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-peach text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
