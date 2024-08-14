import { TextLink } from '/src/components/atoms/TextLink';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: TextLink
} as Meta<typeof TextLink>;

const Template: StoryObj<typeof TextLink> = {
  render: (args) => <TextLink {...args} />
};

export const Primary = {
  ...Template,
  args: {
    href: './',
    external: false,
    text: 'Internal link',
    lang: 'en'
  }
};

export const Secondary = {
  ...Template,
  args: {
    href: 'https://xsound.jp/',
    external: true,
    text: '外部リンク',
    lang: 'ja'
  }
};
