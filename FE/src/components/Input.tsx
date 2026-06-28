import type { ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = '', id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-text"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-3 py-2 text-sm bg-white border ${
          error ? 'border-red-500' : 'border-border'
        } rounded-lg placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:bg-gray-50 disabled:text-text-secondary ${
          className
        }`}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-text-secondary">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
