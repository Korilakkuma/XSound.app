import type React from 'react';

import { FileUploader } from '/src/components/atoms/FileUploader';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: FileUploader
} as Meta<typeof FileUploader>;

const FileUploaderContainer: React.FC<{
  accept: string;
  disabled: boolean;
  placeholder: string;
  filename: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = (args) => {
  return <FileUploader {...args} />;
};

const Template: StoryObj<typeof FileUploader> = {
  render: (args) => <FileUploaderContainer {...args} />
};

export const Primary = {
  ...Template,
  args: {
    accept: 'audio/*',
    disabled: false,
    placeholder: 'MP3, Ogg, WAV ... etc',
    filename: '',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      alert(event.type);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    accept: 'audio/*',
    disabled: false,
    placeholder: 'MP3, Ogg, WAV ... etc',
    filename: 'Default filename',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      alert(event.type);
    }
  }
};

export const Tertiary = {
  ...Template,
  args: {
    accept: 'audio/*',
    disabled: true,
    placeholder: 'MP3, Ogg, WAV ... etc',
    filename: 'Default filename',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      alert(event.type);
    }
  }
};
