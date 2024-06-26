import { Grid } from '/src/components/atoms/Grid';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Grid
} as Meta<typeof Grid>;

const Template: StoryObj<typeof Grid> = {
  render: (args) => {
    return (
      <Grid {...args} numberOfItems={3}>
        <div style={{ height: '150px', backgroundColor: '#333' }} />
        <div style={{ height: '300px', backgroundColor: '#666' }} />
        <div style={{ height: '600px', backgroundColor: '#999' }} />
      </Grid>
    );
  }
};

export const Primary = {
  ...Template
};
