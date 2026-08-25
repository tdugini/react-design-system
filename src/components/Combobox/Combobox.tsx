import {
  forwardRef,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
} from 'react';
import { cx } from '../../utils/cx';
import './Combobox.css';

export interface ComboboxProps<T>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'name' | 'onChange' | 'size' | 'value'> {
  options: readonly T[];
  getOptionValue: (option: T) => string;
  getOptionLabel: (option: T) => string;
  filterOption?: (option: T, query: string) => boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: T | undefined) => void;
  label: string;
  hint?: string;
  placeholder?: string;
  emptyMessage?: ReactNode;
  name?: string;
  clearable?: boolean;
}

function defaultFilter<T>(option: T, query: string, getOptionLabel: (option: T) => string) {
  return getOptionLabel(option).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
}

function ComboboxInner<T>(
  {
    options,
    getOptionValue,
    getOptionLabel,
    filterOption,
    value,
    defaultValue,
    onValueChange,
    label,
    hint,
    placeholder = 'Search…',
    emptyMessage = 'No matching options.',
    name,
    clearable = true,
    disabled,
    required,
    className,
    id,
    ...inputProps
  }: ComboboxProps<T>,
  forwardedRef: ForwardedRef<HTMLInputElement>,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((option) => getOptionValue(option) === selectedValue);
  const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : '';
  const [query, setQuery] = useState(selectedLabel);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return [...options];
    return options.filter((option) =>
      filterOption ? filterOption(option, query) : defaultFilter(option, query, getOptionLabel),
    );
  }, [filterOption, getOptionLabel, options, query]);

  const commitValue = (nextValue: string, option: T | undefined) => {
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue, option);
  };

  const selectOption = (option: T) => {
    const nextValue = getOptionValue(option);
    commitValue(nextValue, option);
    setQuery(getOptionLabel(option));
    setOpen(false);
    setActiveIndex(0);
  };

  const clearSelection = () => {
    commitValue('', undefined);
    setQuery('');
    setOpen(true);
    setActiveIndex(0);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setOpen(true);
    setActiveIndex(0);

    if (selectedOption && nextQuery !== selectedLabel) {
      commitValue('', undefined);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(0);
        return;
      }
      if (filteredOptions.length) setActiveIndex((current) => (current + 1) % filteredOptions.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(Math.max(filteredOptions.length - 1, 0));
        return;
      }
      if (filteredOptions.length) {
        setActiveIndex((current) => (current - 1 + filteredOptions.length) % filteredOptions.length);
      }
    }

    if (event.key === 'Home' && open && filteredOptions.length) {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === 'End' && open && filteredOptions.length) {
      event.preventDefault();
      setActiveIndex(filteredOptions.length - 1);
    }

    if (event.key === 'Enter' && open) {
      const activeOption = filteredOptions[activeIndex];
      if (activeOption) {
        event.preventDefault();
        selectOption(activeOption);
      }
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      setQuery(selectedLabel);
    }
  };

  const activeOptionId = open && filteredOptions[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div
      ref={rootRef}
      className={cx('td-combobox', disabled && 'td-combobox--disabled', className)}
      onBlur={(event) => {
        if (rootRef.current?.contains(event.relatedTarget)) return;
        setOpen(false);
        if (selectedOption) setQuery(selectedLabel);
      }}
    >
      <label className="td-combobox__label" htmlFor={inputId}>
        {label}
        {required && <span className="td-combobox__required" aria-hidden="true"> *</span>}
      </label>

      <div className={cx('td-combobox__control', open && 'td-combobox__control--open')}>
        <svg className="td-combobox__search" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="4.75" stroke="currentColor" strokeWidth="1.5" />
          <path d="m12 12 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          {...inputProps}
          ref={forwardedRef}
          id={inputId}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-activedescendant={activeOptionId}
          aria-describedby={hintId}
          autoComplete="off"
          className="td-combobox__input"
          disabled={disabled}
          required={required}
          value={query}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => {
            setOpen(true);
            const selectedIndex = filteredOptions.findIndex((option) => getOptionValue(option) === selectedValue);
            setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
          }}
          onKeyDown={onKeyDown}
        />

        {clearable && !disabled && (query || selectedValue) && (
          <button type="button" className="td-combobox__clear" aria-label={`Clear ${label}`} onClick={clearSelection}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {hint && <p className="td-combobox__hint" id={hintId}>{hint}</p>}
      {name && <input type="hidden" name={name} value={selectedValue} />}

      {open && !disabled && (
        <div className="td-combobox__popover">
          <ul id={listboxId} role="listbox" aria-label={`${label} options`} className="td-combobox__list">
            {filteredOptions.length ? filteredOptions.map((option, index) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);
              const selected = optionValue === selectedValue;
              const active = index === activeIndex;
              return (
                <li
                  key={optionValue}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  className={cx('td-combobox__option', active && 'td-combobox__option--active')}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  <span>{optionLabel}</span>
                  {selected && (
                    <svg className="td-combobox__check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="m3.5 8.2 2.7 2.7 6.3-6.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              );
            }) : (
              <li className="td-combobox__empty">{emptyMessage}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export const Combobox = forwardRef(ComboboxInner) as <T>(
  props: ComboboxProps<T> & RefAttributes<HTMLInputElement>,
) => ReactElement | null;
