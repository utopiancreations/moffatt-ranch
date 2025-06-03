
import Hero from "@/components/Hero";
import { FruitTypeCard } from "@/components/FruitTypeCard";
import { fruitTypes } from "@/data/fruitTypes";

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
      
      <section className="section-padding section-light-sage">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-medium text-ranch-text mb-4">Fruit Varieties</h2>
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
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Comfortable walking shoes
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Sun hat and sunscreen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Reusable bags or containers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-ranch-accent rounded-full mr-3"></span>
                    Camera for memories!
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
                    Enjoy samples while you pick!
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <button className="btn-primary">
                Plan Your Visit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fruit;
