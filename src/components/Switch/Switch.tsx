import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Switch.css';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
  description?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, onCheckedChange, label, description, className, disabled, ...props },
  ref,
) {
  return (
    <div className={cx('td-switch-row', className)}>
      <span className="td-switch-row__copy">
        <span className="td-switch-row__label">{label}</span>
        {description && <span className="td-switch-row__description">{description}</span>}
      </span>
      <button
        {...props}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        className={cx('td-switch', checked && 'td-switch--checked')}
        onClick={(event) => {
          props.onClick?.(event);
          if (!event.defaultPrevented) onCheckedChange?.(!checked);
        }}
      >
        <span className="td-switch__thumb" />
      </button>
    </div>
  );
});
