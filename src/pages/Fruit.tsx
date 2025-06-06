
import Hero from "@/components/Hero";
import { FruitTypeCard } from "@/components/FruitTypeCard";
import { fruitTypes } from "@/data/fruitTypes";
import { Link } from "react-router-dom";

const Fruit = () => {
  // Alternate background colors for fruit type sections
  const backgroundColors = [
    "bg-white",
    "section-light-sage",
    "bg-white", 
    "section-light-green",
    "bg-white"
  ];

  return (
    <div>
      <Hero
        backgroundVideo="/lovable-uploads/video_fx_undefined_2025_05_03_17_23.mp4"
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        title="Our Peaches & Nectarines"
        subtitle="Tree-ripened to perfection, available during peak season"
      />

      {/* Farm Fresh Varieties Section */}
      <section className="section-padding section-light-green">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-medium text-ranch-text mb-4">Farm Fresh Varieties</h2>
            <div className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>
                At Moffatt Ranch, we grow over 15 varieties of peaches and nectarines, along with delicious Asian pears. Each variety has been carefully selected for its exceptional flavor, juiciness, and overall quality.
              </p>
              <p>
                Our fruit is allowed to ripen naturally on the tree, developing maximum sweetness and flavor before it's picked. Whether you're visiting for U-Pick or purchasing our pre-picked fruit, you're guaranteed the freshest, most delicious stone fruit experience.
              </p>
              <p>
                Availability varies throughout the season, so check our social media or give us a call to find out what's currently ripe for picking!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding section-light-sage">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-medium text-ranch-text mb-4">Our Fruit Selection</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully cultivated selection of stone fruits, each variety chosen for its 
              exceptional flavor, texture, and seasonal availability. From early summer peaches to 
              late-season Asian pears, we offer something special throughout our harvest season.
            </p>
          </div>
          
          <div className="space-y-8">
            {fruitTypes.map((fruitType, index) => (
              <FruitTypeCard
                key={fruitType.id}
                title={fruitType.title}
                description={fruitType.description}
                varieties={fruitType.varieties}
                backgroundColor={backgroundColors[index] || "bg-white"}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="text-center bg-sage-light p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-ranch-text font-cabin">U-Pick Experience</h3>
            <p className="max-w-2xl mx-auto text-gray-700 mb-6 leading-relaxed">
              Experience the joy of picking your own tree-ripened fruit! Our U-Pick operation 
              allows you to select the perfect peaches and nectarines directly from the tree, 
              ensuring maximum freshness and flavor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-left">
                <h4 className="font-semibold text-ranch-text mb-3">What to Bring:</h4>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3 mt-2 shrink-0"></span>
                    <span><strong>Sun Protection:</strong> Hats, sunscreen, and sunglasses are recommended as the orchard offers limited shade during picking.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3 mt-2 shrink-0"></span>
                    <span><strong>Water:</strong> Bring water bottles to stay hydrated, especially on hot days. We also have water available for purchase.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3 mt-2 shrink-0"></span>
                    <span><strong>Payment:</strong> Cash or Venmo for payment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3 mt-2 shrink-0"></span>
                    <span><strong>Comfortable Shoes:</strong> Essential for walking through the orchard.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3 mt-2 shrink-0"></span>
                    <span><strong>Extra Bags or Boxes:</strong> While we provide containers for picking, you might want to bring additional bags or boxes for transporting your fruit home.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3 mt-2 shrink-0"></span>
                    <span><strong>Camera:</strong> Capture the fun memories of your day at the orchard! Our scenic farm makes for great photos. Feel free to share on our Facebook Page!</span>
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-ranch-text mb-3">Best Practices:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Gentle handling for best quality
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Pick what you'll use fresh
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Ask our staff for variety recommendations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Enjoy samples while you pick! (Please be mindful of waste)
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/visit" className="btn-primary">
                Plan Your Visit & See Hours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fruit;
