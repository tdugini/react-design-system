import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './IconButton.css';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'danger';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, label, icon, size = 'md', tone = 'default', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('td-icon-button', `td-icon-button--${size}`, `td-icon-button--${tone}`, className)}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  );
});
