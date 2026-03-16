import clsx from 'clsx';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  isLoading = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'font-medium transition-smooth duration-200 cursor-pointer focus-visible:outline-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-glow',
    secondary: 'bg-surface border border-border hover:border-primary/50 text-text-primary hover:bg-surface/80',
    danger: 'bg-danger hover:bg-danger/90 text-white shadow-md hover:shadow-glow-danger',
    success: 'bg-success hover:bg-success/90 text-white shadow-md hover:shadow-glow-success',
    ghost: 'hover:bg-surface/50 text-text-primary hover:text-text-primary',
    accent: 'bg-gradient-to-r from-primary to-accent hover:shadow-glow text-white',
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-md',
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-base rounded-lg',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 spinner" />
          {children}
        </>
      ) : (
        <>
          {Icon && <Icon size={size === 'xs' ? 14 : size === 'sm' ? 16 : 20} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
