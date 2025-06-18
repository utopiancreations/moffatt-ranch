
import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div>
      <Hero
        backgroundVideo="https://firebasestorage.googleapis.com/v0/b/joshresumesite.firebasestorage.app/o/video_fx_undefined_2025_05_06_14_08.mp4?alt=media&token=fd9727f0-53d7-4935-bd74-800375edc3dc"
        backgroundImage="/lovable-uploads/ad98ec17-4140-41d1-bdfe-63c993a8c1e3.png"
        title="Contact Us"
        subtitle="We'd love to hear from you! Get in touch with any questions about our ranch."
      />
      
      {/* Contact Info & Form */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div>
              <h2 className="heading-medium mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-ranch-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Visit Our Ranch
                  </h3>
                  <p className="text-gray-700 ml-8">1870 Walnut Blvd, Brentwood, CA 94513</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-ranch-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Us
                  </h3>
                  <p className="text-gray-700 ml-8"><a href="tel:+19253840443" className="hover:text-ranch-accent">(925) 384-0443</a></p>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-ranch-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email Us
                  </h3>
                  <p className="text-gray-700 ml-8"><a href="mailto:moffattranch1870@gmail.com" className="hover:text-ranch-accent">moffattranch1870@gmail.com</a></p>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-ranch-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Hours of Operation
                  </h3>
                  <div className="text-gray-700 ml-8">
                    <p className="mb-1">Open 7 days a week, 8:00am - 4:30pm</p>
                    <p className="text-sm text-ranch-accent mt-2">
                      *Hours may vary depending on fruit availability. Please check our social media for updates.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4 ml-8">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ranch-accent hover:text-ranch-accent/80 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ranch-accent hover:text-ranch-accent/80 transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-padding section-light-green">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="enhanced-card p-6">
              <h3 className="text-xl font-serif font-semibold mb-2">When is your U-Pick season?</h3>
              <p className="text-gray-700">Our U-Pick season typically runs from early June through August, depending on weather conditions and fruit ripening schedules. Different varieties ripen at different times throughout the season.</p>
            </div>
            
            <div className="enhanced-card p-6">
              <h3 className="text-xl font-serif font-semibold mb-2">Do I need a reservation to visit?</h3>
              <p className="text-gray-700">No, reservations are not required. Just stop by during our open hours! For large groups (10+ people), we do appreciate a call ahead so we can better accommodate you.</p>
            </div>
            
            <div className="enhanced-card p-6">
              <h3 className="text-xl font-serif font-semibold mb-2">Are dogs allowed at the ranch?</h3>
              <p className="text-gray-700">Yes! We are a dog-friendly orchard. We just ask that all dogs remain on a leash at all times and that owners clean up after their pets.</p>
            </div>
            
            <div className="enhanced-card p-6">
              <h3 className="text-xl font-serif font-semibold mb-2">What forms of payment do you accept?</h3>
              <p className="text-gray-700">We accept cash and Venmo. Currently, we do not accept personal checks.</p>
            </div>
            
            <div className="enhanced-card p-6">
              <h3 className="text-xl font-serif font-semibold mb-2">Do you ship fruit?</h3>
              <p className="text-gray-700">Currently, we do not offer shipping services. All of our fruit is available for purchase directly at the ranch during our operational hours.</p>
            </div>
            
            <div className="enhanced-card p-6">
              <h3 className="text-xl font-serif font-semibold mb-2">Is the orchard accessible for those with mobility challenges?</h3>
              <p className="text-gray-700">Parts of our orchard have improved pathways that are more accessible, and we're happy to direct visitors to these areas. The ground can be uneven in places, but our staff is always available to assist or to pick fruit from less accessible areas upon request.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
