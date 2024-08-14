import type React from 'react';

export type Props = {
  href: string;
  text: string;
  external: boolean;
  lang: 'en' | 'ja';
};

export const TextLink: React.FC<Props> = (props: Props) => {
  const { href, text, external, lang } = props;

  if (external) {
    return (
      <a className='TextLink' href={href} target='_blank' rel='noopener noreferrer' lang={lang}>
        {text}
      </a>
    );
  }

  return (
    <a className='TextLink' href={href} lang={lang}>
      {text}
    </a>
  );
};
