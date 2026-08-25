import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import './Tabs.css';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used inside <Tabs>.');
  return context;
}

export interface TabsProps {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, defaultValue, onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const baseId = useId();
  const currentValue = value ?? internalValue;
  const setValue = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  const context = useMemo(() => ({ value: currentValue, setValue, baseId }), [currentValue, baseId]);

  return <TabsContext.Provider value={context}><div className={cx('td-tabs', className)}>{children}</div></TabsContext.Provider>;
}

export interface TabsListProps { children: ReactNode; ariaLabel: string; className?: string; }

export function TabsList({ children, ariaLabel, className }: TabsListProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<TabsTriggerProps>[];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const enabled = items.filter((item) => !item.props.disabled);
    const activeIndex = enabled.findIndex((item) => item.props.value === document.activeElement?.getAttribute('data-tab-value'));
    let nextIndex = activeIndex;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = enabled.length - 1;
    if (event.key === 'ArrowRight') nextIndex = (activeIndex + 1 + enabled.length) % enabled.length;
    if (event.key === 'ArrowLeft') nextIndex = (activeIndex - 1 + enabled.length) % enabled.length;
    const nextValue = enabled[nextIndex]?.props.value;
    if (!nextValue) return;
    event.preventDefault();
    const element = event.currentTarget.querySelector<HTMLElement>(`[data-tab-value="${CSS.escape(nextValue)}"]`);
    element?.focus();
    element?.click();
  };

  return <div role="tablist" aria-label={ariaLabel} className={cx('td-tabs__list', className)} onKeyDown={onKeyDown}>{children}</div>;
}

export interface TabsTriggerProps { value: string; children: ReactNode; disabled?: boolean; className?: string; }

export function TabsTrigger({ value, children, disabled, className }: TabsTriggerProps) {
  const context = useTabsContext();
  const selected = context.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${context.baseId}-tab-${value}`}
      aria-controls={`${context.baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      data-tab-value={value}
      className={cx('td-tabs__trigger', className)}
      onClick={() => context.setValue(value)}
    >{children}</button>
  );
}

export interface TabsPanelProps { value: string; children: ReactNode; className?: string; }

export function TabsPanel({ value, children, className }: TabsPanelProps) {
  const context = useTabsContext();
  if (context.value !== value) return null;
  return <div role="tabpanel" id={`${context.baseId}-panel-${value}`} aria-labelledby={`${context.baseId}-tab-${value}`} tabIndex={0} className={cx('td-tabs__panel', className)}>{children}</div>;
}
