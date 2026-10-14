import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  href,
  onClick,
  className = '',
  style,
  target,
  rel,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] select-none text-center cursor-pointer';

  let variantClasses = '';

  if (variant === 'primary') {
    variantClasses =
      'bg-[#051A24] text-white rounded-none px-7 py-3 text-sm md:text-base shadow-button-primary hover:bg-[#082330]';
  } else if (variant === 'secondary') {
    variantClasses =
      'bg-white text-[#051A24] rounded-none px-7 py-3 text-sm md:text-base shadow-button-secondary hover:bg-slate-50 border-0';
  } else if (variant === 'tertiary') {
    variantClasses =
      'bg-white text-[#0D212C] rounded-none px-7 py-3 text-sm md:text-base shadow-button-tertiary hover:bg-slate-50 border border-black/5';
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        style={style}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClasses}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
