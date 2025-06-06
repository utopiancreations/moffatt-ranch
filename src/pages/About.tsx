
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
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium mb-6 text-olive text-center">Our Beginning</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Walter Moffatt was born in Brentwood, California, in 1924 on Walnut Boulevard. He was raised farming walnuts and apricots with his family. Walter attended Stanford University. He and Jeanne also attended Stanford, and they married in 1951. They dreamed of building something lasting together. In 1955, they planted their first peach trees at Moffatt Ranch. With determination and a deep love for farming, they raised two children and built Moffatt Ranch from the ground up. They established a reputation for growing exceptional stone fruit while starting the second U-Pick in Brentwood. Their passion for farming and commitment to quality quickly earned them recognition throughout California. The unique soil that Moffatt peaches thrive in, combined with its ideal climate, provided the perfect conditions for growing sweet, juicy peaches and nectarines that customers came back for year after year. What began as a small family operation has flourished over six decades into one of Brentwood’s most beloved U-Pick destinations. The Moffatts maintained their personal touch and quality that the Moffatt name has come to represent.
          </p>
          <div className="my-8 flex justify-center">
            <img
              src="/lovable-uploads/509cc7c2-eecb-482d-aac4-35e622e65ab2.png"
              alt="Walter and Jeanne Moffatt"
              className="rounded-lg shadow-lg max-w-full md:max-w-lg"
            />
          </div>
        </div>
      </section>
      
      {/* Legacy Section */}
      <section className="section-padding bg-olive-light">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium mb-6 text-olive text-center">Continuing the Legacy</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Today, Jim and Michele Moffatt carry on the family tradition, maintaining the same standards of excellence established by Jim’s parents. Jim and Michele’s farming background and their love for peaches is the reason Moffatt Ranch continues to thrive and provide the U-Pick community with exceptional Moffatt fruit. Jim brings decades of farming expertise to the operation, carefully tending to each variety of fruit to ensure optimal flavor and quality. Michele’s warm hospitality and community involvement have helped strengthen the ranch’s connection with local residents, loyal visitors from all over the US, and many countries from abroad. Their growing family supports the family operation by showing up every summer to bring fruit to the local community at Brentwood Farmer’s Market. Together, they’ve expanded the orchard to include over 15 varieties of peaches and nectarines, as well as Asian pears, providing everyone with a diverse selection of delicious, farm-fresh fruit throughout the season.
          </p>
          <div className="my-8 flex justify-center">
            <img
              src="/lovable-uploads/ad98ec17-4140-41d1-bdfe-63c993a8c1e3.png"
              alt="Jim and Michele Moffatt"
              className="rounded-lg shadow-lg max-w-full md:max-w-lg"
            />
          </div>
        </div>
      </section>
      
      {/* Quality for You Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium mb-6 text-olive text-center">Quality for You</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We believe in letting our fruit ripen naturally on the tree until it reaches peak flavor. It’s impossible to find a peach like the Moffatt Peach at a grocery store. We never compromise on quality, ensuring that every peach and nectarine that is picked at our ranch is bursting with flavor. Whether you are eating a whole fresh peach, sliced on your cereal, making jam, or peach cobbler, the Moffatt Peach is incomparable in providing outstanding flavor while standing up to a bake.
          </p>
          <div className="my-8 flex justify-center">
            <img
              src="/lovable-uploads/family-photo-placeholder.png"
              alt="Moffatt family placeholder"
              className="rounded-lg shadow-lg max-w-full md:max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* Grown for You Section */}
      <section className="section-padding bg-seaMoss/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium mb-6 text-olive text-center">Grown for You</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We believe U-Pick farms are places where families create lasting memories. Our U-Pick experience allows visitors to connect with locally grown products fresh from the tree and enjoy the simple pleasure of personally harvesting each hand-picked fruit that is perfectly tree-ripened. If U-Pick isn’t for you, you can visit us for fruit handpicked every morning to purchase direct from our barn. We’re proud to be part of the agricultural heritage of Brentwood and to share our passion with our community, friends, and families. Experience the difference of tree-ripened fruit and create memories that will last a lifetime. Come taste what makes Moffatt Peaches truly special.
          </p>
          <div className="my-8 flex justify-center">
            {/* Video Placeholder: Replace with actual video component or iframe if available */}
            <video
              src="/lovable-uploads/mt-diablo-video-placeholder.mp4"
              controls
              className="rounded-lg shadow-lg max-w-full md:max-w-lg"
              poster="/lovable-uploads/mt-diablo-poster-placeholder.png" // Optional: add a poster image
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
