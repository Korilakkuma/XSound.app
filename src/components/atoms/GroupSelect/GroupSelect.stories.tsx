import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { useCallback, useState } from 'react';
import { GroupSelect } from '/src/components/atoms/GroupSelect';

export default {
  component: GroupSelect
} as Meta<typeof GroupSelect>;

const Template: StoryObj<typeof GroupSelect> = {
  render: (args) => {
    const [value, setValue] = useState<string>('A');

    const onChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.currentTarget.value);
    }, []);

    return <GroupSelect {...args} value={value} onChange={onChange} />;
  }
};

export const Primary = {
  ...Template,
  args: {
    label: 'Primary Group Select',
    values: {
      group0: ['A', 'B', 'C'],
      group1: ['D', 'E', 'F'],
      group2: ['G', 'H', 'I']
    },
    texts: {
      group0: ['0 - 0', '0 - 1', '0 - 2'],
      group1: ['1 - 0', '1 - 1', '1 - 2'],
      group2: ['2 - 0', '2 - 1', '2 - 2']
    },
    groups: ['group0', 'group1', 'group2']
  }
};
