
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { supabase } from "@/integrations/supabase/client";

type FruitVariety = {
  id: string;
  name: string;
  description: string;
  available_from: string;
  available_to: string;
  image_url: string;
  type: "yellow_peach" | "white_peach" | "yellow_nectarine" | "white_nectarine" | "asian_pear";
};

const Fruit = () => {
  const [fruitVarieties, setFruitVarieties] = useState<FruitVariety[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('fruits')
          .select('*')
          .order('name');
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setFruitVarieties(data);
        } else {
          // If no fruit data is found in the database, display a message
          setError("No fruit varieties found. Please add some in the admin panel.");
        }
      } catch (err) {
        console.error("Error fetching fruits:", err);
        setError("Failed to load fruit data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  // Helper function to render fruit sections
  const renderFruitSection = (type: string, title: string, bgColor: string) => {
    const filteredFruits = fruitVarieties.filter(fruit => fruit.type === type);
    
    if (filteredFruits.length === 0) return null;
    
    return (
      <section className={`section-padding ${bgColor}`}>
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">{title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFruits.map((fruit) => (
              <div key={fruit.id} className={`${bgColor === 'bg-white' ? 'bg-leaf' : 'bg-white'} rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row`}>
                <div className="md:w-1/3">
                  <img 
                    src={fruit.image_url || "/placeholder.svg"} 
                    alt={fruit.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-serif font-semibold mb-2">{fruit.name}</h3>
                  <p className="text-gray-700 mb-3">{fruit.description}</p>
                  <p className="text-sm text-peach font-medium">
                    Season: {fruit.available_from} - {fruit.available_to}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <Hero
 backgroundVideo="https://firebasestorage.googleapis.com/v0/b/joshresumesite.firebasestorage.app/o/video_fx_undefined_2025_05_03_17_23.mp4?alt=media&token=e7978bb6-5840-48f9-80e3-63806c993f9b"
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        title="Our Fruit"
        subtitle="Discover the variety of tree-ripened peaches, nectarines, and Asian pears at Moffatt Ranch"
      />
      
      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="heading-medium mb-6">Farm Fresh Varieties</h2>
          <p className="text-gray-700 text-lg mb-6">
            At Moffatt Ranch, we grow over 15 varieties of peaches and nectarines, along with delicious Asian pears. Each variety has been carefully selected for its exceptional flavor, juiciness, and overall quality.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            Our fruit is allowed to ripen naturally on the tree, developing maximum sweetness and flavor before it's picked. Whether you're visiting for U-Pick or purchasing our pre-picked fruit, you're guaranteed the freshest, most delicious stone fruit experience.
          </p>
          <p className="text-gray-700 text-lg">
            Availability varies throughout the season, so check our social media or give us a call to find out what's currently ripe for picking!
          </p>
        </div>
      </section>
      
      {loading ? (
        <section className="section-padding bg-white">
          <div className="container mx-auto text-center">
            <p className="text-xl text-gray-600">Loading fruit varieties...</p>
          </div>
        </section>
      ) : error ? (
        <section className="section-padding bg-white">
          <div className="container mx-auto text-center">
            <p className="text-xl text-red-600">{error}</p>
          </div>
        </section>
      ) : (
        <>
          {renderFruitSection('yellow_peach', 'Yellow Peaches', 'bg-peach-light')}
          {renderFruitSection('white_peach', 'White Peaches', 'bg-white')}
          {renderFruitSection('yellow_nectarine', 'Yellow Nectarines', 'bg-peach-light')}
          {renderFruitSection('white_nectarine', 'White Nectarines', 'bg-white')}
          {renderFruitSection('asian_pear', 'Asian Pears', 'bg-peach-light')}
        </>
      )}
      
      {/* Seasonal Availability */}
      <section className="section-padding bg-ranch-blue text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium text-center mb-10">Seasonal Availability</h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-semibold mb-4">When to Visit</h3>
              <p className="mb-4">
                Our U-Pick season typically runs from early June through August, depending on weather conditions and fruit ripening schedules.
              </p>
              <p>
                Different varieties ripen at different times, so there's always something delicious to pick throughout the season!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-xl font-serif font-medium mb-3 text-peach-light">Early Season</h4>
                <p className="font-medium">June - Early July</p>
                <p className="text-sm mt-2">Early peach and nectarine varieties</p>
              </div>
              
              <div>
                <h4 className="text-xl font-serif font-medium mb-3 text-peach-light">Mid Season</h4>
                <p className="font-medium">Mid July</p>
                <p className="text-sm mt-2">Peak varieties of peaches and nectarines</p>
              </div>
              
              <div>
                <h4 className="text-xl font-serif font-medium mb-3 text-peach-light">Late Season</h4>
                <p className="font-medium">Late July - August</p>
                <p className="text-sm mt-2">Late peaches, nectarines, and Asian pears</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="italic">
                For current picking availability, please check our social media pages or give us a call before your visit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fruit;
