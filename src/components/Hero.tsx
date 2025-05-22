
import { ReactNode, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type HeroProps = {
  backgroundImage?: string;
  backgroundVideo?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  children?: ReactNode;
  imageOverlay?: string;
  useUrbandale?: boolean;
};

// Updated Hero component with video implementation and smaller image size
const Hero = ({
  backgroundImage,
  backgroundVideo,
  title,
  subtitle,
  buttonText,
  buttonLink,
  overlay = true,
  children,
  imageOverlay,
  useUrbandale = false
}: HeroProps) => {
  // Use useRef to handle video loading
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to load the video when the component mounts
    if (videoRef.current && backgroundVideo) {
      videoRef.current.load();
    }
  }, [backgroundVideo]);

  return (
    <div 
      className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {backgroundVideo ? (
        <video 
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src={backgroundVideo} type="video/mp4" />
          {/* Fallback image if video fails to load */}
          {backgroundImage && <img src={backgroundImage} alt="Fallback" className="w-full h-full object-cover" />}
        </video>
      ) : backgroundImage && (
        <div 
          className="absolute w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {overlay && (
        <div className="absolute inset-0 bg-black opacity-40"></div>
      )}
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        {imageOverlay ? (
          <div className="flex flex-col items-center justify-center">
            <img 
              src={imageOverlay} 
              alt="Moffatt Ranch Peaches" 
              className="w-auto max-h-[35vh] md:max-h-[30vh] mx-auto" // Reduced from 40vh to 35vh/30vh
            />
            {children && (
              <div className="mt-6 font-cabin"> 
                {children}
              </div>
            )}
          </div>
        ) : (
          <>
            {title && (
              <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 ${useUrbandale ? 'font-cabin' : 'font-sans'}`}>
                {title}
              </h1>
            )}
            
            {subtitle && (
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-cabin">
                {subtitle}
              </p>
            )}
            
            {children}
          </>
        )}
        
        {buttonText && buttonLink && (
          <Link to={buttonLink} className="btn-primary inline-block mt-8">
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
