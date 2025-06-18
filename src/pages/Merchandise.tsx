
import Hero from "@/components/Hero";
import { MerchandiseCard } from "@/components/MerchandiseCard";
import { merchandiseItems } from "@/data/merchandise";

const Merchandise = () => {
  return (
    <div>
      <Hero
        backgroundVideo="/lovable-uploads/video_fx_undefined_2025_05_03_17_23.mp4"
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        title="Ranch Merchandise"
        subtitle="Quality ranch products available for purchase at our location"
      />
      
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Our Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/*
            {merchandiseItems.map((item) => (
              <MerchandiseCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                available={item.available}
              />
            ))}
            */}
            <div className="col-span-full text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Merchandise Coming Soon!</h3>
              <p className="text-gray-500">Check back later for our exciting new products.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center bg-olive-light p-8 rounded-lg">
            <h3 className="text-xl font-medium mb-4 text-olive">Visit Us To Purchase</h3>
            <p className="max-w-2xl mx-auto text-gray-700">
              All of our merchandise is available for purchase at our ranch location.
              Come visit us during our regular business hours to browse our selection and 
              enjoy the fresh peach experience! We accept cash and Venmo for payments!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merchandise;
