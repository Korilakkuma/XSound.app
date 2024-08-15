import type React from 'react';
import { useMemo } from 'react';
import { TextLink } from '/src/components/atoms/TextLink';

export const Footer: React.FC = () => {
  const year = useMemo(() => {
    const date = new Date();

    return date.getFullYear();
  }, []);

  return (
    <footer className='Footer'>
      <p>Copyright (c) 2012 - {year}</p>
      <p>
        <TextLink href='https://github.com/Korilakkuma' text='Korilakkuma' external={true} lang='en' />
        <span>(Tomohiro IKEDA)</span>
      </p>
      <p>
        <TextLink href='https://maoudamashii.jokersounds.com/' text='音楽素材/魔王魂' external={true} lang='ja' />
      </p>
    </footer>
  );
};
