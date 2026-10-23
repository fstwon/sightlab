import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './FilterSelect.module.scss';

export type FilterSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type FilterSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  options: readonly FilterSelectOption[];
};

export const FilterSelect = forwardRef<HTMLSelectElement, FilterSelectProps>(function FilterSelect(
  { className, options, disabled, 'aria-label': ariaLabel = '태그 필터', ...props },
  ref,
) {
  return (
    <span
      className={[styles.wrapper, disabled && styles.disabled, className].filter(Boolean).join(' ')}
    >
      <select
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        disabled={disabled}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" size={16} className={styles.chevron} />
    </span>
  );
});
