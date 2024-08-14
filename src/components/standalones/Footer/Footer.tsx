import type React from 'react';
import { useMemo } from 'react';

export const Footer: React.FC = () => {
  const year = useMemo(() => {
    const date = new Date();

    return date.getFullYear();
  }, []);

  return (
    <footer className='Footer'>
      <p>Copyright (c) 2012 - {year}</p>
      <p>
        <a href='https://github.com/Korilakkuma' target='_blank' rel='noopener noreferrer'>
          Korilakkuma
        </a>
        <span>(Tomohiro IKEDA)</span>
      </p>
      <p>
        <a href='https://maoudamashii.jokersounds.com/' target='_blank' rel='noopener noreferrer' lang='ja'>
          音楽素材/魔王魂
        </a>
      </p>
    </footer>
  );
};
