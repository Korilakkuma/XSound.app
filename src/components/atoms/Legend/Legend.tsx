import React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const Legend: React.FC<Props> = (props: Props) => {
  // Use `div` instead of `legend` because cannot click if Safari
  return <div className='Legend'>{props.children}</div>;
};
