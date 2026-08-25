import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes } from 'react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, description, indeterminate = false, ...props },
  forwardedRef,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const internalRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className="td-checkbox" htmlFor={inputId}>
      <input
        {...props}
        ref={(node) => {
          internalRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        id={inputId}
        type="checkbox"
        className="td-checkbox__native"
      />
      <span className="td-checkbox__box" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3.4 8.2 6.6 11.2 12.7 4.9" /></svg>
        <span className="td-checkbox__minus" />
      </span>
      <span className="td-checkbox__copy">
        <span className="td-checkbox__label">{label}</span>
        {description && <span className="td-checkbox__description">{description}</span>}
      </span>
    </label>
  );
});
