import React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const Legend: React.FC<Props> = (props: Props) => {
  return <legend className='Legend'>{props.children}</legend>;
};
