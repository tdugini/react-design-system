import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  dot?: boolean;
  children: ReactNode;
}

export function Badge({ className, tone = 'neutral', dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cx('td-badge', `td-badge--${tone}`, className)} {...props}>
      {dot && <span className="td-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
