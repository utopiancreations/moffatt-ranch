
import { FruitVariety } from "@/data/fruitTypes";

interface FruitTypeCardProps {
  title: string;
  description: string;
  varieties: FruitVariety[];
  backgroundColor: string;
}

export const FruitTypeCard = ({ title, description, varieties, backgroundColor }: FruitTypeCardProps) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300`}>
      <h3 className="text-2xl font-semibold text-ranch-text mb-3 font-cabin">{title}</h3>
      <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
      
      {varieties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {varieties.map(variety => (
            <div key={variety.id} className="fruit-variety-card bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-olive text-lg">{variety.name}</h4>
                {variety.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2 leading-relaxed">{variety.description}</p>
              <p className="text-xs text-ranch-accent font-medium">{variety.season}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md p-4 shadow-sm">
          <p className="text-gray-500 italic text-center">Varieties coming soon - check back for updates!</p>
        </div>
      )}
    </div>
  );
};
