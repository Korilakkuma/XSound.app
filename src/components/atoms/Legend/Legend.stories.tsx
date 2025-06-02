import { Legend } from '/src/components/atoms/Legend';

import type { Meta, StoryObj } from '@storybook/react-vite';

export default {
  component: Legend
} as Meta<typeof Legend>;

const Template: StoryObj<typeof Legend> = {
  render: (args) => {
    return (
      <fieldset {...args}>
        <Legend>Legend</Legend>
        <ul>
          <li>
            <label>
              <input type='checkbox' value='1' />
              <span style={{ marginLeft: '8px' }}>1</span>
            </label>
          </li>
          <li>
            <label>
              <input type='checkbox' value='2' />
              <span style={{ marginLeft: '8px' }}>2</span>
            </label>
          </li>
          <li>
            <label>
              <input type='checkbox' value='3' />
              <span style={{ marginLeft: '8px' }}>3</span>
            </label>
          </li>
          <li>
            <label>
              <input type='checkbox' value='4' />
              <span style={{ marginLeft: '8px' }}>4</span>
            </label>
          </li>
          <li>
            <label>
              <input type='checkbox' value='5' />
              <span style={{ marginLeft: '8px' }}>5</span>
            </label>
          </li>
        </ul>
      </fieldset>
    );
  }
};

export const Primary = {
  ...Template
};
