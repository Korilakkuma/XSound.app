import type React from 'react';
import { useCallback, useState } from 'react';

import { Spinner } from '/src/components/atoms/Spinner';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Spinner
} as Meta<typeof Spinner>;

const SpinnerContainer: React.FC<{
  id?: string | undefined;
  min: number;
  max: number;
  step: number;
}> = (args) => {
  const [value, setValue] = useState<number>(0);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.valueAsNumber);
  }, []);

  const props = { ...args, value, onChange };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
      <label htmlFor={props.id}>Spinner</label>
      <Spinner {...props} />
    </div>
  );
};

const Template: StoryObj<typeof Spinner> = {
  render: (args) => <SpinnerContainer {...args} />
};

export const Primary = {
  ...Template,
  args: {
    id: 'spinner',
    min: -100,
    max: 100,
    step: 1
  }
};
