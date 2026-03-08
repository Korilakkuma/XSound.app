import type React from 'react';
import { useId } from 'react';

export type Props = {
  label: string;
  values: string[];
  texts: string[];
  disabled: boolean;
  textTransform: boolean;
  defaultValue?: string | undefined;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

export const Select: React.FC<Props> = ({ label, values, texts, disabled, textTransform, defaultValue, tabIndex, onChange }) => {
  const id = useId();

  return (
    <div className={`Select${textTransform ? ' upper' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} disabled={disabled} defaultValue={defaultValue} tabIndex={tabIndex} onChange={onChange}>
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
