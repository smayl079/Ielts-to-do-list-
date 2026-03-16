import clsx from 'clsx';

export const Card = ({
  children,
  className,
  glass = true,
  noBorder = false,
  clickable = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl transition-smooth duration-300',
        glass ? 'glass' : 'bg-surface border border-border',
        !noBorder && !glass && 'border-border',
        clickable && 'cursor-pointer hover:-translate-y-1 hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
