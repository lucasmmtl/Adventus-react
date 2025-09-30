import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  type = 'text', 
  placeholder, 
  className = '', 
  error,
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-slate-800">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`px-4 py-3 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10 placeholder:text-slate-500 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;