
import Hero from "@/components/Hero";

const Fruit = () => {
  return (
    <div>
      <Hero
        backgroundVideo="/lovable-uploads/video_fx_undefined_2025_05_03_17_23.mp4"
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        title="Our Peaches & Nectarines"
        subtitle="Tree-ripened to perfection, available during peak season"
      />
      
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Fruit Varieties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-olive-light"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-cabin mb-2">Early Season Peaches</h3>
                <p className="text-gray-600 mb-4">Available mid to late June</p>
                <p className="text-gray-700">Sweet and juicy varieties that kick off our peach season.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-seaMoss"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-cabin mb-2">Mid Season Peaches</h3>
                <p className="text-gray-600 mb-4">Available July through early August</p>
                <p className="text-gray-700">Peak season varieties with exceptional flavor and texture.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-olive-light"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-cabin mb-2">Late Season Peaches</h3>
                <p className="text-gray-600 mb-4">Available late August through September</p>
                <p className="text-gray-700">Extended season varieties for late summer enjoyment.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-seaMoss"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-cabin mb-2">Nectarines</h3>
                <p className="text-gray-600 mb-4">Available July through August</p>
                <p className="text-gray-700">Smooth-skinned stone fruit with intense flavor.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-olive-light"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-cabin mb-2">Asian Pears</h3>
                <p className="text-gray-600 mb-4">Available late summer</p>
                <p className="text-gray-700">Crisp, sweet pears with a unique texture.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center bg-olive-light p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-olive">U-Pick Experience</h3>
            <p className="max-w-2xl mx-auto text-gray-700 mb-6">
              Experience the joy of picking your own tree-ripened fruit! Our U-Pick operation 
              allows you to select the perfect peaches and nectarines directly from the tree, 
              ensuring maximum freshness and flavor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-left">
                <h4 className="font-semibold text-olive mb-2">What to Bring:</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Comfortable walking shoes</li>
                  <li>• Sun hat and sunscreen</li>
                  <li>• Reusable bags or containers</li>
                  <li>• Camera for memories!</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-olive mb-2">Best Practices:</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Gentle handling for best quality</li>
                  <li>• Pick what you'll use fresh</li>
                  <li>• Ask our staff for variety recommendations</li>
                  <li>• Enjoy samples while you pick!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fruit;
