import React from 'react';

export type Props = {
  numberOfItems: number;
  children: React.ReactNode;
};

export const Grid: React.FC<Props> = (props: Props) => {
  const { numberOfItems, children } = props;

  return (
    <div className='Grid' style={{ gridTemplateColumns: `repeat(${numberOfItems}, ${1400 / numberOfItems}px)` }}>
      {children}
    </div>
  );
};
