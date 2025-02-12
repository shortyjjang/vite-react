import React, {forwardRef} from 'react'
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props }, ref) => {
  return (
    <button className={twMerge('rounded-xl bg-blue-500 text-white py-2 px-4', className)} {...props} ref={ref}>
      {children}
    </button>
  )
})

Button.displayName = 'Button';

export default Button;
