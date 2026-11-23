import { useState } from 'react';
import { Newspaper } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function EditorialImage({ src, alt, className = 'w-full h-full object-cover' }: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-stone-100 text-stone-500 border border-stone-200 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Newspaper className="w-7 h-7 mb-2 text-emerald-900/60" strokeWidth={1.5} />
        <span className="text-xs font-medium text-stone-600 line-clamp-2 max-w-xs">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
