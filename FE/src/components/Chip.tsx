import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ChipProps extends ComponentPropsWithoutRef<'button'> {
  selected?: boolean;
  children: ReactNode;
}

export function Chip({ selected = false, children, className = '', ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
        selected
          ? 'border-primary bg-primary-light text-primary font-medium shadow-sm'
          : 'border-border hover:border-border-hover text-text bg-white'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
