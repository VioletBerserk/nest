import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';

type InputStatus = 'default' | 'error' | 'success';

/* ── Shared wrapper ─────────────────────────────────────────────────────── */
interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  required?: boolean;
  id: string;
  children: React.ReactNode;
}

export function Field({ label, hint, error, success, required, id, children }: FieldProps) {
  const status: InputStatus = error ? 'error' : success ? 'success' : 'default';
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-label-md text-neutral-800 font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-terracotta-500 text-xs leading-none">*</span>}
        </label>
      )}
      {children}
      {(error || success || hint) && (
        <p className={[
          'flex items-center gap-1.5 text-caption leading-tight',
          status === 'error'   ? 'text-error-500'   :
          status === 'success' ? 'text-success-500' : 'text-neutral-500',
        ].join(' ')}>
          {status === 'error'   && <AlertCircle size={12} className="flex-shrink-0" />}
          {status === 'success' && <CheckCircle size={12} className="flex-shrink-0" />}
          {error || success || hint}
        </p>
      )}
    </div>
  );
}

/* ── Base input classes ─────────────────────────────────────────────────── */
function inputBase(status: InputStatus, className = '') {
  return [
    'w-full font-sans text-body-sm text-neutral-900 bg-white',
    'rounded-lg border transition-all duration-150 ease-smooth',
    'placeholder:text-neutral-400',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
    'disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed',
    status === 'error'
      ? 'border-error-500 focus-visible:ring-error-300'
      : status === 'success'
      ? 'border-success-500 focus-visible:ring-success-300'
      : 'border-neutral-300 focus-visible:border-terracotta-500 focus-visible:ring-terracotta-200',
    className,
  ].filter(Boolean).join(' ');
}

/* ── Text Input ─────────────────────────────────────────────────────────── */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: InputStatus;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ status = 'default', iconLeft, iconRight, className = '', ...props }, ref) => {
    const hasLeft  = Boolean(iconLeft);
    const hasRight = Boolean(iconRight);

    return (
      <div className="relative flex items-center">
        {hasLeft && (
          <span className="absolute left-3 text-neutral-400 pointer-events-none [&>svg]:size-4">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          className={inputBase(status, [
            'h-10 px-3',
            hasLeft  ? 'pl-9'  : '',
            hasRight ? 'pr-9'  : '',
            className,
          ].join(' '))}
          {...props}
        />
        {hasRight && (
          <span className="absolute right-3 text-neutral-400 pointer-events-none [&>svg]:size-4">
            {iconRight}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* ── Password Input ─────────────────────────────────────────────────────── */
export function PasswordInput({ status = 'default', className = '', ...props }: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex items-center">
      <input
        type={show ? 'text' : 'password'}
        className={inputBase(status, `h-10 px-3 pr-10 ${className}`)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 text-neutral-400 hover:text-neutral-600 transition-colors"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

/* ── Textarea ───────────────────────────────────────────────────────────── */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?: InputStatus;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ status = 'default', className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={inputBase(status, `min-h-[100px] px-3 py-2.5 resize-y ${className}`)}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

/* ── Select ─────────────────────────────────────────────────────────────── */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  status?: InputStatus;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ status = 'default', className = '', children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={inputBase(status, `h-10 px-3 pr-8 appearance-none cursor-pointer ${className}`)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
    </div>
  )
);
Select.displayName = 'Select';

/* ── Checkbox ───────────────────────────────────────────────────────────── */
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className="inline-flex items-start gap-2.5 cursor-pointer group">
      <input
        id={id}
        type="checkbox"
        className={[
          'mt-0.5 size-4 rounded border border-neutral-300 bg-white',
          'text-terracotta-500 cursor-pointer',
          'checked:bg-terracotta-500 checked:border-terracotta-500',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-300 focus-visible:ring-offset-1',
          'transition-all duration-150',
          className,
        ].join(' ')}
        {...props}
      />
      {label && (
        <span className="text-body-sm text-neutral-700 group-hover:text-neutral-900 transition-colors select-none">
          {label}
        </span>
      )}
    </label>
  );
}

/* ── Radio ──────────────────────────────────────────────────────────────── */
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Radio({ label, id, className = '', ...props }: RadioProps) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2.5 cursor-pointer group">
      <input
        id={id}
        type="radio"
        className={[
          'size-4 border-2 border-neutral-300 bg-white',
          'text-terracotta-500 cursor-pointer',
          'checked:border-terracotta-500',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-300 focus-visible:ring-offset-1',
          'transition-all duration-150',
          className,
        ].join(' ')}
        {...props}
      />
      {label && (
        <span className="text-body-sm text-neutral-700 group-hover:text-neutral-900 transition-colors select-none">
          {label}
        </span>
      )}
    </label>
  );
}

/* ── Toggle ─────────────────────────────────────────────────────────────── */
interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function Toggle({ checked, onChange, label, disabled = false, size = 'md' }: ToggleProps) {
  const track = size === 'sm' ? 'w-8 h-4' : 'w-10 h-5';
  const thumb = size === 'sm' ? 'size-3 top-0.5 left-0.5' : 'size-3.5 top-[3px] left-[3px]';
  const shift = size === 'sm' ? 'translate-x-4' : 'translate-x-5';

  return (
    <label className={`inline-flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          'relative rounded-full transition-colors duration-200 ease-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-300 focus-visible:ring-offset-2',
          track,
          checked ? 'bg-terracotta-500' : 'bg-neutral-300',
        ].join(' ')}
      >
        <span
          className={[
            'absolute rounded-full bg-white shadow-sm transition-transform duration-200 ease-spring',
            thumb,
            checked ? shift : 'translate-x-0',
          ].join(' ')}
        />
      </button>
      {label && <span className="text-body-sm text-neutral-700 select-none">{label}</span>}
    </label>
  );
}

/* ── Search Input ───────────────────────────────────────────────────────── */
export function SearchInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative flex items-center">
      <svg className="absolute left-3 size-4 text-neutral-400 pointer-events-none" viewBox="0 0 20 20" fill="none">
        <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className={inputBase('default', `h-10 pl-9 pr-3 ${className}`)}
        {...props}
      />
    </div>
  );
}
