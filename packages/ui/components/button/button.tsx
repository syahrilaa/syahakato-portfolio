import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { cn, tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

const classes = tv({
  base: 'btn',
  variants: {
    size: {
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      tertiary: 'btn-tertiary',
      outlined: 'btn-outline',
      ghost: 'btn-ghost',
      underline: 'btn-link',
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'primary',
  },
});

export type ButtonStyleProps = VariantProps<typeof classes>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  ref?: React.RefObject<HTMLButtonElement | null>;
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  isLoading,
  disabled,
  asChild,
  ref,
  className,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  const isDisabled = disabled || isLoading;
  return (
    <Comp
      ref={ref}
      data-loading={isLoading}
      data-pending={isLoading}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={cn(classes({ size, variant }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
