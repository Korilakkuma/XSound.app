import type { Preview } from '@storybook/react-vite';
import '/src/main.css';

export const parameters: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }
  }
};
export const tags = ['autodocs'];
