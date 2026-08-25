import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './TextField.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, className, label, hint, error, prefix, suffix, disabled, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const hasDescription = Boolean(error || hint);

  return (
    <div className={cx('td-field', disabled && 'td-field--disabled', className)}>
      <label className="td-field__label" htmlFor={inputId}>{label}</label>
      <div className={cx('td-field__control', error && 'td-field__control--error')}>
        {prefix && <span className="td-field__adornment" aria-hidden="true">{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          className="td-field__input"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          {...props}
        />
        {suffix && <span className="td-field__adornment" aria-hidden="true">{suffix}</span>}
      </div>
      {hasDescription && (
        <p id={descriptionId} className={cx('td-field__description', error && 'td-field__description--error')}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
});
