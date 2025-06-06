
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-ranch-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/7a4769d7-643d-4a8f-84fa-4ed084f81d1f.png" 
              alt="Moffatt Ranch Logo" 
              className="h-16 mb-4"
            />
            <p className="text-gray-300 mb-4 text-center md:text-left">
              Family-owned U-Pick peach and nectarine orchard in Brentwood since 1955.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/moffattranch" target="_blank" rel="noopener noreferrer" className="text-white hover:text-peach transition-colors">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://instagram.com/moffattranchbrentwood" target="_blank" rel="noopener noreferrer" className="text-white hover:text-peach transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-medium mb-4 text-center md:text-left">Quick Links</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link to="/" className="text-gray-300 hover:text-peach transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-peach transition-colors">Our Story</Link></li>
              <li><Link to="/fruit" className="text-gray-300 hover:text-peach transition-colors">Our Fruit</Link></li>
              <li><Link to="/visit" className="text-gray-300 hover:text-peach transition-colors">Visit Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-peach transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-serif font-medium mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center justify-center md:justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-peach" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p>1870 Walnut Blvd, Brentwood, CA 94513</p>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-peach" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p><a href="tel:+12094830048" className="hover:text-peach">(209) 483-0048</a> or <a href="tel:+19163371738" className="hover:text-peach">(916) 337-1738</a></p>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-peach" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p><a href="mailto:moffattranch1870@gmail.com" className="hover:text-peach">moffattranch1870@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} Moffatt Ranch Peaches. Est. 1955. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
