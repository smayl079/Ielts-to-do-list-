import clsx from 'clsx';

export const Skeleton = ({
  className,
  variant = 'block',
  count = 1,
  circle = false,
  ...props
}) => {
  const variants = {
    block: 'h-4 rounded-md',
    text: 'h-4 rounded-md',
    avatar: 'w-12 h-12 rounded-full',
    thumbnail: 'w-full h-48 rounded-lg',
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={clsx('skeleton', variants[variant], circle && 'rounded-full', className)}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx('skeleton', variants[variant], circle && 'rounded-full', className)}
      {...props}
    />
  );
};

export default Skeleton;
