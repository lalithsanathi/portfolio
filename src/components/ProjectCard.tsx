import { Link } from '@tanstack/react-router';
import { clsx } from 'clsx';

type CardSize = 'short' | 'tall';

interface ProjectCardProps {
  title: string;
  href?: string;
  size?: CardSize;
  imageSrc?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

const sizeClasses: Record<CardSize, string> = {
  short: 'aspect-4/3',
  tall: 'aspect-8/9',
};

const sharedClasses = [
  'group relative block w-full overflow-hidden rounded-2xl p-6 text-left',
  'transition-transform duration-200 active:scale-[0.96]',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700',
];

export default function ProjectCard({
  title,
  href,
  size = 'short',
  imageSrc,
  variant = 'light',
  className,
}: ProjectCardProps) {
  const hasImage = !!imageSrc;

  const classes = clsx(
    sharedClasses,
    sizeClasses[size],
    !hasImage && 'bg-stone-300 ring-1 ring-inset ring-black/5',
    hasImage && variant === 'dark' && 'text-white ring-1 ring-inset ring-white/10',
    hasImage && variant === 'light' && 'text-black ring-1 ring-inset ring-black/10',
    !hasImage && variant === 'dark' && 'text-white',
    !hasImage && variant === 'light' && 'text-black',
    className,
  );

  const bgStyle = imageSrc
    ? { backgroundImage: `url(${imageSrc})` }
    : undefined;

  const content = (
    <>
      {hasImage && (
        <span
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105"
          style={bgStyle}
          aria-hidden
        />
      )}
      <span className="relative text-base font-medium uppercase text-balance">
        {title}
      </span>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a className={classes} aria-disabled="true">
      {content}
    </a>
  );
}
