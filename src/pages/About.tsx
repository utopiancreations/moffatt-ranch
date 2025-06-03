
import Hero from "../components/Hero";

const About = () => {
  return (
    <div>
       <Hero
        backgroundVideo="lovable-uploads/video_fx_undefined_2025_05_03_17_23-2.mp4"
        backgroundImage="/lovable-uploads/ad98ec17-4140-41d1-bdfe-63c993a8c1e3.png"
        title="Our Story"
        subtitle="A family tradition of growing the finest peaches in Brentwood since 1955"
      />
      
      {/* Beginning Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="/lovable-uploads/509cc7c2-eecb-482d-aac4-35e622e65ab2.png" 
                alt="Walter and Jeanne Moffatt with fresh peaches" 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="heading-medium mb-6 text-olive">Our Beginning</h2>
              <p className="text-gray-700 mb-4">
                Walter Moffatt was born in Brentwood, California on Walnut Boulevard. He was raised farming and later met Jeanne as students at Stanford University. They married in the 1950s with dreams of building something lasting together.
              </p>
              <p className="text-gray-700 mb-4">
                In 1955, Jeanne and Walter Moffatt planted their first peach trees at Moffatt Ranch. With determination and a deep love for farming, they raised two children and built Moffatt Ranch from the ground up, establishing a reputation for growing exceptional stone fruit while starting the second U-Pick in Brentwood.
              </p>
              <p className="text-gray-700 mb-4">
                Their passion for farming and commitment to quality quickly earned them recognition throughout California. The unique soil that Moffatt Peaches thrive in, combined with its ideal climate, provided the perfect conditions for growing sweet, juicy peaches and nectarines that customers came back for year after year.
              </p>
              <p className="text-gray-700">
                What began as a small family operation has flourished over six decades into one of Brentwood's beloved U-Pick destinations. The Moffatts maintained their personal touch and quality that the Moffatt name has come to represent.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Legacy Section */}
      <section className="section-padding bg-olive-light">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="heading-medium mb-6 text-olive">Continuing the Legacy</h2>
              <p className="text-gray-700 mb-4">
                Today, Jim and Michele Moffatt carry on the family tradition, maintaining the same standards of excellence established by Jim's parents. Jim and Michele's farming background and their love for peaches is the reason Moffatt Ranch continues to thrive and provide the U-Pick community with exceptional Moffatt fruit.
              </p>
              <p className="text-gray-700 mb-4">
                Jim brings decades of farming expertise to the operation, carefully tending to each variety of fruit to ensure optimal flavor and quality. Michele's warm hospitality and community involvement have helped strengthen the ranch's connection with local residents, loyal visitors from all over the US, and many countries from abroad.
              </p>
              <p className="text-gray-700">
                Their growing family supports the family operation by showing up every summer to bring fruit to the local community at Brentwood Farmer's Market. Together, they've expanded the orchard to include over 15 varieties of peaches and nectarines, as well as Asian pears, providing everyone with a diverse selection of delicious, farm-fresh fruit throughout the season.
              </p>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="/lovable-uploads/ad98ec17-4140-41d1-bdfe-63c993a8c1e3.png" 
                alt="Jim and Michele Moffatt with fresh peaches" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Quality for You Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-medium mb-8 text-olive">Quality for You</h2>
            
            <div className="mb-10">
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe in letting our fruit ripen naturally on the tree until it reaches peak flavor. It's impossible to find a peach like the Moffatt Peach at a grocery store. We never compromise on quality, ensuring that every peach and nectarine that is picked at our ranch is bursting with flavor.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                Whether you are eating a whole fresh peach, sliced on your cereal, making jam, or peach cobbler, the Moffatt Peach is incomparable in providing outstanding flavor while standing up to a bake.
              </p>
            </div>
            
            <div>
              <img 
                src="/lovable-uploads/bff42a70-320b-4900-a939-844cee7ea426.png" 
                alt="Fresh Moffatt peaches ready for harvest" 
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grown for You Section */}
      <section className="section-padding bg-seaMoss/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-medium mb-8 text-olive">Grown for You</h2>
            
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe U-Pick farms are places where families create lasting memories. Our U-Pick experience allows visitors to connect with locally grown products fresh from the tree and enjoy the simple pleasure of personally harvesting each hand-picked fruit that is perfectly tree-ripened.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                If U-Pick isn't for you, you can visit us for fruit handpicked every morning to purchase direct from our barn. We're proud to be part of the agricultural heritage of Brentwood and to share our passion with our community, friends, and families.
              </p>
              
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-cabin font-semibold mb-4 text-olive">Visit Moffatt Ranch</h3>
                <p className="text-gray-600">
                  Experience the difference of tree-ripened fruit and create memories that will last a lifetime. 
                  Come taste what makes Moffatt Peaches truly special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
