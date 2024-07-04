import type React from 'react';
import { useId } from 'react';

export type Props = {
  label: string;
  values: string[];
  texts: string[];
  disabled: boolean;
  defaultValue?: string | undefined;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

export const Select: React.FC<Props> = (props: Props) => {
  const { label, values, texts, disabled, defaultValue, tabIndex, onChange } = props;

  const id = useId();

  return (
    <div className='Select'>
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
