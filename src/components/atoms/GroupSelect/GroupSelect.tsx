import type React from 'react';
import { useId } from 'react';

export type Props = {
  label: string;
  value: string;
  values: { [group: string]: string[] };
  texts: { [group: string]: string[] };
  groups: string[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

export const GroupSelect: React.FC<Props> = (props: Props) => {
  const { label, value, values, texts, groups, onChange } = props;

  const id = useId();

  return (
    <div className='GroupSelect'>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        {groups.map((group: string, key: number) => {
          return (
            <optgroup key={key} label={group}>
              {values[group].map((value: string, index: number) => {
                return (
                  <option key={value} value={value}>
                    {texts[group][index]}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
};
