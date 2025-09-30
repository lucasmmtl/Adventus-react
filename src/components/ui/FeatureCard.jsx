import Card from './Card';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card hover className="text-center">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        {icon} {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

export default FeatureCard;