
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        backgroundVideo="https://firebasestorage.googleapis.com/v0/b/joshresumesite.firebasestorage.app/o/video_fx_undefined_2025_05_03_17_23.mp4?alt=media&token=e7978bb6-5840-48f9-80e3-63806c993f9b"
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        imageOverlay="/lovable-uploads/9e45f4b0-f497-4cc5-8015-3058c909c171.png"
        buttonText="Plan Your Visit"
        buttonLink="/visit"
        useUrbandale={true}
      >
        <p className="text-xl text-white max-w-3xl mx-auto font-cabin">
          Welcome to Moffatt Ranch, where we grow the juiciest peaches, nectarines, and Asian pears in Brentwood, California since 1955
        </p>
      </Hero>
      
      {/* Features Section */}
      <section className="section-padding section-light-sage">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-12">Experience Moffatt Ranch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
              title="Family Fun"
              description="Create lasting memories with a fun day of U-Pick fruit harvesting perfect for all ages"
            />
            
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              }
              title="Farm Fresh Fruit"
              description="Enjoy the sweetest, tree-ripened peaches and nectarines picked at peak freshness"
            />
            
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              }
              title="Family Owned Since 1955"
              description="Three generations of farming expertise dedicated to growing the best stone fruit"
            />
            
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                  <path d="M17 6l-7.5 7.5L3 10.5"></path>
                  <path d="M17 6l-7.5 7.5-2.5-2.5"></path>
                  <path d="M3 10.5l7.5 7.5L21 7.5"></path>
                </svg>
              }
              title="Dog Friendly"
              description="Leashed dogs are welcome to join your family on your fruit picking adventure"
            />
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="section-padding section-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="heading-medium mb-6">Our Farm to Your Table</h2>
              <p className="text-gray-700 mb-6">
                Since 1955, the Moffatt family has been growing premium quality stone fruit in the fertile soil of Brentwood, California. What started with Jeanne and Walter has now passed to Jim and Michele, who continue the family legacy of providing the community with the freshest, juiciest peaches and nectarines.
              </p>
              <p className="text-gray-700 mb-6">
                Our U-Pick experience lets you and your family select perfectly ripened fruit straight from the tree. There's nothing quite like biting into a sun-warmed peach you just picked yourself!
              </p>
              <Link to="/about" className="btn-primary inline-block">Learn Our Story</Link>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="/lovable-uploads/f0641324-2e3f-4a07-a7f1-b28d73a9b280.png" 
                alt="Jim and Michele Moffatt with fresh peaches" 
                className="rounded-lg shadow-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Fruit Varieties Section */}
      <section className="section-padding section-light-green">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Our Delicious Varieties</h2>
          
<div className="enhanced-card overflow-hidden">
  <img 
    src="lovable-uploads/2399ad98-c225-4056-8b5d-14fa66f5396b.png" 
    alt="Fresh peach closeup" 
    className="w-full h-64 object-cover object-top"
    style={{ objectPosition: 'top' }}
  />
  <div className="p-6">
    <h3 className="text-xl font-serif font-semibold mb-2">Peaches</h3>
    <p className="text-gray-700 mb-4">
      From yellow to white varieties, our peaches are known for their perfect balance of sweetness and juiciness.
    </p>
    <Link to="/fruit" className="text-olive font-medium hover:text-ranch-accent flex items-center">
      Learn More
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </Link>
  </div>
</div>
            
            <div className="enhanced-card overflow-hidden">
              <img 
                src="public/lovable-uploads/f0641324-2e3f-4a07-a7f1-b28d73a9b280.png" 
                alt="Fresh nectarines" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2">Nectarines</h3>
                <p className="text-gray-700 mb-4">
                  Enjoy the smooth skin and vibrant flavor of our yellow and white nectarine varieties.
                </p>
                <Link to="/fruit" className="text-olive font-medium hover:text-ranch-accent flex items-center">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="enhanced-card overflow-hidden">
              <img 
                src="public/lovable-uploads/509cc7c2-eecb-482d-aac4-35e622e65ab2.png" 
                alt="Asian pears" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2">Asian Pears</h3>
                <p className="text-gray-700 mb-4">
                  Crisp, juicy and refreshingly sweet, our Asian pears are the perfect late-summer treat.
                </p>
                <Link to="/fruit" className="text-olive font-medium hover:text-ranch-accent flex items-center">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/fruit" className="btn-outline inline-block">View All Varieties</Link>
          </div>
        </div>
      </section>
      
      {/* Visit Section */}
      <section className="section-padding section-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="bg-sage-light/30 p-6 rounded-lg max-w-3xl mx-auto mb-8">
              <h2 className="heading-medium mb-4 text-ranch-text">Plan Your Visit</h2>
              <p className="text-xl">
                Join us for a memorable day at the orchard. U-Pick is available seasonally from June through August.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Location and Contact Container */}
            <div className="bg-cream-card p-8 rounded-lg shadow-md border border-borderLight">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-ranch-text">Location & Contact</h3>
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2 text-olive">Address</h4>
                <p className="mb-4 text-gray-700">123 Orchard Lane, Brentwood, CA 94513</p>
                <h4 className="text-lg font-medium mb-2 text-olive">Contact</h4>
                <p className="text-gray-700">(925) 555-1234</p>
                <p className="text-gray-700">info@moffattranchpeaches.com</p>
              </div>
            </div>
            
            {/* Hours and Directions Container */}
            <div className="bg-cream-card p-8 rounded-lg shadow-md border border-borderLight">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-ranch-text">Current Hours</h3>
              <div className="mb-6">
                <div className="mb-1">
                  <span className="font-medium text-gray-800">Friday - Sunday:</span> 
                  <span className="text-gray-700 ml-2">9:00am - 4:00pm</span>
                </div>
                <div className="mb-4">
                  <span className="font-medium text-gray-800">Monday - Thursday:</span> 
                  <span className="text-gray-700 ml-2">Closed</span>
                </div>
                <p className="text-sm mb-6 text-gray-600">
                  *Hours may vary depending on fruit availability. Please check our social media for updates.
                </p>
                
                <div className="flex justify-center md:justify-start">
                  <Link to="/visit" className="btn-primary">Get Directions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
