import clsx from 'clsx';
import { useId } from 'react';

export const Input = ({
  label,
  error,
  placeholder,
  className,
  type = 'text',
  icon: Icon,
  suffix,
  ...props
}) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={clsx(
            'w-full px-4 py-2.5 bg-surface border border-border rounded-lg',
            'text-text-primary placeholder-text-muted',
            'transition-smooth duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'hover:border-border/80',
            Icon && 'pl-10',
            suffix && 'pr-10',
            error && 'border-danger focus:ring-danger',
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted text-sm">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="text-danger text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
