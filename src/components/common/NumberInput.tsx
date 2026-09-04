// src/components/common/NumberInput.tsx
import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  min?: number;
  placeholder?: string;
  className?: string;
}

/**
 * A controlled numeric input that displays the value formatted with comma
 * thousand-separators when not focused, accepts raw digit/decimal typing while
 * focused (strips non-digits and multiple decimal points), and clamps to `min`
 * (default 0) on blur before calling onChange with the parsed number.
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  disabled = false,
  min = 0,
  placeholder,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState(String(value ?? 0));

  useEffect(() => {
    if (!focused) {
      setRaw(String(value ?? 0));
    }
  }, [value, focused]);

  const handleFocus = () => {
    setFocused(true);
    setRaw(String(value ?? 0));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let cleaned = '';
    let hasDot = false;
    for (const ch of val) {
      if (ch >= '0' && ch <= '9') {
        cleaned += ch;
      } else if (ch === '.' && !hasDot) {
        cleaned += ch;
        hasDot = true;
      }
    }
    setRaw(cleaned);
    const parsed = parseFloat(cleaned);
    if (Number.isFinite(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    setFocused(false);
    const parsed = parseFloat(raw);
    const clamped = Number.isFinite(parsed) ? Math.max(min, parsed) : min;
    setRaw(String(clamped));
    onChange(clamped);
  };

  const display = focused ? raw : (Number.isFinite(value) ? value.toLocaleString() : '0');

  return (
    <input
      type="text"
      inputMode="decimal"
      value={display}
      disabled={disabled}
      placeholder={placeholder}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  );
};
