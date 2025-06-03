
interface MerchandiseCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  available: boolean;
}

export const MerchandiseCard = ({ name, description, price, image, available }: MerchandiseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold font-cabin">{name}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-olive">${price}</span>
          {available ? (
            <span className="text-seaMoss text-sm font-medium">Available at ranch</span>
          ) : (
            <span className="text-red-600 text-sm">Currently unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};
