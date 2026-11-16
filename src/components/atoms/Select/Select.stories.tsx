import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { useCallback, useState } from 'react';
import { Select } from '/src/components/atoms/Select';

export default {
  component: Select
} as Meta<typeof Select>;

const Template: StoryObj<typeof Select> = {
  render: (args) => {
    const [value, setValue] = useState<string>('A');

    const onChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.currentTarget.value);
    }, []);

    return <Select {...args} value={value ?? 'A'} onChange={onChange} />;
  }
};

export const Primary = {
  ...Template,
  args: {
    label: 'Primary Select',
    values: ['A', 'B', 'C'],
    texts: ['0 - 0', '0 - 1', '0 - 2'],
    disabled: false,
    textTransform: false
  }
};

export const Secondary = {
  ...Template,
  args: {
    label: 'Tertiary Select',
    values: ['A', 'B', 'C'],
    texts: ['0 - a', '0 - b', '0 - c'],
    disabled: false,
    textTransform: true
  }
};
