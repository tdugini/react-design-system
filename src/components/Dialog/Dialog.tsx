import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import './Dialog.css';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, title, description, children, footer, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => onOpenChange(false);
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onOpenChange]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={cx('td-dialog', className)}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="td-dialog__surface">
        <header className="td-dialog__header">
          <div>
            <h2 className="td-dialog__title">{title}</h2>
            {description && <p className="td-dialog__description">{description}</p>}
          </div>
          <button className="td-dialog__close" type="button" aria-label="Close dialog" onClick={() => onOpenChange(false)}>×</button>
        </header>
        <div className="td-dialog__body">{children}</div>
        {footer && <footer className="td-dialog__footer">{footer}</footer>}
      </div>
    </dialog>,
    document.body,
  );
}
