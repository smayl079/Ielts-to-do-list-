import clsx from 'clsx';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon: Icon,
  ...props
}) => {
  const variants = {
    default: 'bg-primary/20 text-primary border border-primary/30',
    secondary: 'bg-accent/20 text-accent border border-accent/30',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    danger: 'bg-danger/20 text-danger border border-danger/30',
    muted: 'bg-border/50 text-text-muted border border-border',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-md',
    md: 'px-3 py-1 text-xs rounded-md',
    lg: 'px-4 py-1.5 text-sm rounded-lg',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium transition-smooth',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />}
      {children}
    </span>
  );
};

export default Badge;
