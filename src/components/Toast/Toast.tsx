import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import './Toast.css';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type ToastPosition = 'top-right' | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastInput {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
  action?: ToastAction;
}

interface ToastRecord extends ToastInput {
  id: string;
  tone: ToastTone;
  duration: number;
}

interface ToastContextValue {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);
let toastId = 0;

export interface ToastProviderProps {
  children: ReactNode;
  defaultDuration?: number;
  limit?: number;
  position?: ToastPosition;
}

function ToastItem({ toast, dismiss }: { toast: ToastRecord; dismiss: (id: string) => void }) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleDismiss = useCallback(() => {
    if (toast.duration <= 0) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => dismiss(toast.id), toast.duration);
  }, [dismiss, toast.duration, toast.id]);

  const pauseDismiss = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  useEffect(() => {
    scheduleDismiss();
    return pauseDismiss;
  }, [scheduleDismiss]);

  return (
    <article
      className={cx('td-toast', `td-toast--${toast.tone}`)}
      role={toast.tone === 'danger' ? 'alert' : 'status'}
      aria-atomic="true"
      onMouseEnter={pauseDismiss}
      onMouseLeave={scheduleDismiss}
      onFocusCapture={pauseDismiss}
      onBlurCapture={scheduleDismiss}
    >
      <span className="td-toast__indicator" aria-hidden="true" />
      <div className="td-toast__content">
        <strong className="td-toast__title">{toast.title}</strong>
        {toast.description && <p className="td-toast__description">{toast.description}</p>}
        {toast.action && (
          <button
            type="button"
            className="td-toast__action"
            onClick={() => {
              toast.action?.onClick();
              dismiss(toast.id);
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button type="button" className="td-toast__dismiss" aria-label={`Dismiss ${toast.title}`} onClick={() => dismiss(toast.id)}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </article>
  );
}

export function ToastProvider({ children, defaultDuration = 4500, limit = 4, position = 'bottom-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const toast = useCallback((input: ToastInput) => {
    const id = `td-toast-${++toastId}`;
    const record: ToastRecord = {
      ...input,
      id,
      tone: input.tone ?? 'neutral',
      duration: input.duration ?? defaultDuration,
    };
    setToasts((current) => [...current, record].slice(-limit));
    return id;
  }, [defaultDuration, limit]);

  const context = useMemo(() => ({ toast, dismiss, dismissAll }), [dismiss, dismissAll, toast]);

  return (
    <ToastContext.Provider value={context}>
      {children}
      <div className={cx('td-toast-viewport', `td-toast-viewport--${position}`)} role="region" aria-label="Notifications">
        {toasts.map((item) => <ToastItem key={item.id} toast={item} dismiss={dismiss} />)}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>.');
  return context;
}
