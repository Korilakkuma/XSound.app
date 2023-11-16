import { Fieldset } from '/src/components/atoms/Fieldset';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Fieldset
} as Meta<typeof Fieldset>;

const Template: StoryObj<typeof Fieldset> = {
  render: (args) => {
    return (
      <Fieldset {...args}>
        <legend>Fieldset</legend>
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
      </Fieldset>
    );
  }
};

export const Primary = {
  ...Template
};
