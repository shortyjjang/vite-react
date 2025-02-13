import {forwardRef} from 'react'
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
}

function Input<T extends HTMLInputElement>({ placeholder, className = '', ...props }: InputProps, ref: React.Ref<T>) {
  return <input placeholder={placeholder} className={twMerge('bg-gray-100 rounded-lg px-4 py-3 w-full', className)} {...props} ref={ref} />;
}

export default forwardRef<HTMLInputElement, InputProps>(Input);