
import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="enhanced-card flex flex-col items-center p-6">
      <div className="text-ranch-accent mb-4 text-4xl">
        {icon}
      </div>
      <h3 className="text-xl font-cabin mb-3 text-ranch-text text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
