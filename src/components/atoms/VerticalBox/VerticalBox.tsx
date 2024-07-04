import type React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const VerticalBox: React.FC<Props> = ({ children }) => {
  return <div className='VerticalBox'>{children}</div>;
};
