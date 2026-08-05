import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/utils/cn';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  strength?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, variant = 'solid', size = 'md', strength = 0.3, ...props }, _ref) => {
    const magneticRef = useMagnetic<HTMLButtonElement>(strength);

    const base =
      'relative inline-flex items-center justify-center font-sans tracking-luxe-sm uppercase rounded-full transition-colors duration-500 overflow-hidden group';

    const sizes = {
      sm: 'text-[10px] px-6 py-3',
      md: 'text-xs px-8 py-4',
      lg: 'text-sm px-10 py-5',
    };

    const variants = {
      solid:
        'bg-gradient-to-r from-gold-light via-gold to-gold-dark text-ivory hover:shadow-[0_0_40px_-8px_rgba(176,141,79,0.5)]',
      outline:
        'border border-ink/15 text-ink hover:border-gold hover:text-gold',
      ghost: 'text-ink hover:text-gold',
    };

    return (
      <button
        ref={magneticRef}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === 'solid' && (
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-luxury" />
        )}
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
