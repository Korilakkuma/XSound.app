import type React from 'react';

import { Select } from '/src/components/atoms/Select';

import type { Meta, StoryObj } from '@storybook/react-vite';

export default {
  component: Select
} as Meta<typeof Select>;

const Template: StoryObj<typeof Select> = {
  render: (args) => <Select {...args} />
};

export const Primary = {
  ...Template,
  args: {
    label: 'Primary Select',
    values: ['A', 'B', 'C'],
    texts: ['0 - 0', '0 - 1', '0 - 2'],
    disabled: false,
    textTransform: false,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    label: 'Secondary Select',
    values: ['A', 'B', 'C'],
    texts: ['0 - 0', '0 - 1', '0 - 2'],
    disabled: false,
    textTransform: false,
    defaultValue: 'C',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Tertiary = {
  ...Template,
  args: {
    label: 'Tertiary Select',
    values: ['a', 'b', 'c'],
    texts: ['0 - 0', '0 - 1', '0 - 2'],
    disabled: false,
    textTransform: true,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};
