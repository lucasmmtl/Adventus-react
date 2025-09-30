const Card = ({ children, className = '', hover = false }) => {
  const hoverClasses = hover ? 'hover:-translate-y-1 hover:shadow-md hover:border-blue-800' : '';
  
  return (
    <div className={`bg-white p-8 rounded-xl shadow-sm border border-slate-200 transition-all duration-200 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;