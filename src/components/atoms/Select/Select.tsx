import type React from 'react';
import { useId } from 'react';

export type Props = {
  label: string;
  value: string;
  values: string[];
  texts: string[];
  disabled: boolean;
  textTransform: boolean;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

export const Select: React.FC<Props> = ({ label, value, values, texts, disabled, textTransform, tabIndex, onChange }) => {
  const id = useId();

  return (
    <div className={`Select${textTransform ? ' upper' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} disabled={disabled} value={value} tabIndex={tabIndex} onChange={onChange}>
        {values.map((value: string, index: number) => {
          return (
            <option key={value} value={value}>
              {texts[index]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
