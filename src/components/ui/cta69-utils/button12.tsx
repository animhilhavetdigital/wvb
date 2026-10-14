import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface Button12Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Button12({ label, asChild, children, className, ...props }: Button12Props) {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(
      child,
      {
        className: cn(
          "group relative inline-flex items-center justify-center gap-3 bg-[#051A24] px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-[#0D212C] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] rounded-none cursor-pointer select-none",
          className,
          child.props.className
        ),
      },
      <>
        <span>{label || child.props.children}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </>
    );
  }

  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 bg-[#051A24] px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-[#0D212C] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] rounded-none cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <span>{label || children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

export default Button12;
