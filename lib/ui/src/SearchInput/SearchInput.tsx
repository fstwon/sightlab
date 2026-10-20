import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './SearchInput.module.scss';

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, placeholder = '노트 검색', disabled, ...props },
  ref,
) {
  return (
    <div
      className={[styles.wrapper, disabled && styles.disabled, className].filter(Boolean).join(' ')}
    >
      <span className={styles.icon} aria-hidden="true">
        ⌕
      </span>
      <input
        {...props}
        ref={ref}
        type="search"
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
    </div>
  );
});
