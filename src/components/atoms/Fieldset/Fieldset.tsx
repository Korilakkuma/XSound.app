import type React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const Fieldset: React.FC<Props> = (props: Props) => {
  return <fieldset className='Fieldset'>{props.children}</fieldset>;
};
