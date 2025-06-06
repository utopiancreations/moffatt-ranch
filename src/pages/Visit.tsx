import Hero from "../components/Hero";
import { Link } from "react-router-dom";

const Visit = () => {
  return (
    <div>
      <Hero
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
         backgroundVideo="https://firebasestorage.googleapis.com/v0/b/joshresumesite.firebasestorage.app/o/video_fx_undefined_2025_05_03_17_23.mp4?alt=media&token=e7978bb6-5840-48f9-80e3-63806c993f9b"
        title="Visit Moffatt Ranch"
        subtitle="Join us for a fun U-Pick experience in the beautiful orchards of Brentwood"
      />
      
      {/* Location Section */}
      <section className="section-padding section-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="heading-medium mb-6">Find Us</h2>
              <div className="mb-6">
                <h3 className="text-xl font-serif font-semibold mb-2">Address</h3>
                <p className="text-gray-700 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-peach flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>1870 Walnut Blvd, Brentwood, CA 94513</span>
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-serif font-semibold mb-2">Current Hours</h3>
                <p className="text-2xl text-red-600 font-bold mb-3">Temporarily Closed</p>
                <div className="text-gray-700">
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">Monday:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">Tuesday:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">Wednesday:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">Thursday:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">Friday:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="font-medium">July 4th:</span>
                    <span>8:00am - 4:30pm</span>
                  </div>
                  <p className="text-sm mt-2 text-peach">
                    *Hours may vary depending on fruit availability and weather conditions. Please check our social media for updates before your visit.
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-serif font-semibold mb-2">Contact</h3>
                <p className="text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-peach" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>(209) 483-0048 or (916) 337-1738</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-peach" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>moffattranch1870@gmail.com</span>
                </p>
              </div>
              
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                Get Directions
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              {/* Placeholder for Google Map - in production this would be an actual Google Maps embed */}
              <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center">
                <img 
                  src="/lovable-uploads/255fb0f5-ecf9-4ed0-a187-f3b2fc38f8d5.png" 
                  alt="Moffatt Ranch location" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* U-Pick Information */}
      <section className="section-padding section-light-sage">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">U-Pick Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="/lovable-uploads/509cc7c2-eecb-482d-aac4-35e622e65ab2.png" 
                alt="Family picking peaches" 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4">How It Works</h3>
              
              <div className="space-y-4 text-gray-700">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-peach text-ranch-dark flex items-center justify-center mr-3 font-medium">
                    1
                  </div>
                  <div>
                    <p>Stop by our farm stand when you arrive. We'll provide you with containers and direct you to the ripest fruit ready for picking.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-peach text-ranch-dark flex items-center justify-center mr-3 font-medium">
                    2
                  </div>
                  <div>
                    <p>Head out to the designated orchard areas and pick your fruit directly from the trees. Our staff can help with recommendations on selecting the ripest fruit.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-peach text-ranch-dark flex items-center justify-center mr-3 font-medium">
                    3
                  </div>
                  <div>
                    <p>Return to the farm stand where we'll weigh your harvest and complete your purchase. Payment is accepted by cash or Venmo.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-peach text-ranch-dark flex items-center justify-center mr-3 font-medium">
                    4
                  </div>
                  <div>
                    <p>Enjoy your fresh-picked fruit! We're happy to offer suggestions for storage and recipes.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-xl font-serif font-medium mb-2">Pricing</h4>
                <p className="text-gray-700">U-Pick: $3.50 per pound.</p>
                <p className="text-gray-700">Pre-picked: $4.00 per pound.</p>
                <p className="text-gray-700 mt-2">Pre-picked fruit is also available for purchase at our farm stand if you prefer not to pick your own.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Availability Section */}
      <section className="section-padding section-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium text-center mb-10">Seasonal Availability</h2>
          <div className="text-center text-gray-700 leading-relaxed mb-8">
            <p className="mb-2">When to Visit: Our U-Pick season typically runs from early June through August, depending on weather conditions and fruit ripening schedules.</p>
            <p className="mb-6">Different varieties ripen at different times, so there's always something delicious to pick throughout the season!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="bg-sage-light p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold text-olive mb-2">Early Season</h4>
              <p className="text-gray-600">June - Early July</p>
              <p className="text-gray-700">Early peach and nectarine varieties</p>
            </div>
            <div className="bg-sage-light p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold text-olive mb-2">Mid Season</h4>
              <p className="text-gray-600">Mid July</p>
              <p className="text-gray-700">Peak varieties of peaches and nectarines</p>
            </div>
            <div className="bg-sage-light p-6 rounded-lg shadow">
              <h4 className="text-xl font-semibold text-olive mb-2">Late Season</h4>
              <p className="text-gray-600">Late July - August</p>
              <p className="text-gray-700">Late peaches, nectarines, and Asian pears</p>
            </div>
          </div>
          <p className="text-center text-gray-700 mt-4">
            For current picking availability, please check our social media pages or give us a call before your visit.
          </p>
        </div>
      </section>
      
      {/* What to Bring */}
      <section className="section-padding section-light-green">
        <div className="container mx-auto">
          <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg max-w-5xl mx-auto">
            <h2 className="heading-medium text-center mb-10 text-ranch-text">What to Bring</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="bg-cardBg-sage p-6 rounded-lg border border-borderSage">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-olive-light text-olive flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-ranch-text">Sun Protection</h3>
                    <p className="text-gray-700">Hats, sunscreen, and sunglasses are recommended as the orchard offers limited shade during picking.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-cardBg-sage p-6 rounded-lg border border-borderSage">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-olive-light text-olive flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-ranch-text">Water</h3>
                    <p className="text-gray-700">Bring water bottles to stay hydrated, especially on hot days. We also have water available for purchase.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-cardBg-sage p-6 rounded-lg border border-borderSage">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-olive-light text-olive flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-ranch-text">Payment</h3>
                    <p className="text-gray-700">Cash or Venmo for payment.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-cardBg-sage p-6 rounded-lg border border-borderSage">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-olive-light text-olive flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-ranch-text">Comfortable Shoes</h3>
                    <p className="text-gray-700">Wear closed-toe shoes or sturdy sandals as the orchard ground can be uneven.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-cardBg-sage p-6 rounded-lg border border-borderSage">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-olive-light text-olive flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-ranch-text">Extra Bags or Boxes</h3>
                    <p className="text-gray-700">While we provide containers for picking, you might want to bring additional bags or boxes for transporting your fruit home.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-cardBg-sage p-6 rounded-lg border border-borderSage">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-olive-light text-olive flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-ranch-text">Camera</h3>
                    <p className="text-gray-700">Capture the fun memories of your day at the orchard! Our scenic farm makes for great photos. Feel free to share on our Facebook Page!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Amenities & Policies */}
      <section className="section-padding section-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Amenities */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-borderLight">
              <h3 className="text-2xl font-serif font-semibold mb-6">Ranch Amenities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Clean sanitation stations</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Handwashing stations</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Friendly staff to assist with your visit</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Ample parking</span>
                </li>
              </ul>
            </div>
            
            {/* Policies */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-borderLight">
              <h3 className="text-2xl font-serif font-semibold mb-6">Ranch Policies</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ranch-blue mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Dogs are welcome but must be kept on a leash at all times. Please bring what you need to clean up after your dog!</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ranch-blue mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Children must be supervised at all times</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ranch-blue mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Please only pick from designated trees as directed by our staff</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ranch-blue mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">No climbing on trees</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ranch-blue mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Please dispose of trash in designated receptacles</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ranch-blue mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">No outside food or beverages (water excepted) in the picking areas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-ranch-dark text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="heading-medium mb-6">Ready for a Sweet Experience?</h2>
          <p className="text-lg mb-8">
            We look forward to welcoming you to Moffatt Ranch for a memorable day of fruit picking. If you have any questions before your visit, don't hesitate to get in touch with us!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline border-white text-white hover:bg-white/10"
            >
              Follow For Updates
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visit;
