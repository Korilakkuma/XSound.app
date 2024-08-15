import type React from 'react';
import { useCallback, useEffect, useState, useId, useMemo, useRef } from 'react';

import { FOCUSABLE_ELEMENTS } from '/src/config';
import { ProgressBar } from '/src/components/atoms/ProgressBar/ProgressBar';
import { TextLink } from '/src/components/atoms/TextLink';

export type Props = {
  rate: number;
  onClickSetupCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Header: React.FC<Props> = ({ rate, onClickSetupCallback }) => {
  const headerRef = useRef<HTMLElement>(null);

  const [animationEnded, setAnimationEnded] = useState<boolean>(false);

  const id = useId();
  const labelId = useMemo(() => `header-label-${id}`, [id]);
  const describeId = useMemo(() => `header-describe-${id}`, [id]);

  const starting = useMemo(() => {
    return rate > 0;
  }, [rate]);

  const loaded = useMemo(() => {
    return rate >= 100;
  }, [rate]);

  const onAnimationEndCallback = useCallback(() => {
    setAnimationEnded(true);
  }, []);

  useEffect(() => {
    const root = document.getElementById('app');

    if (root === null) {
      return;
    }

    const hiddenElement = (element: Element) => {
      return Array.from(document.querySelectorAll('[aria-hidden="true"]')).some((node: Element) => node.contains(element));
    };

    if (loaded) {
      Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => {
          return headerRef.current !== null && !headerRef.current.contains(node) && !hiddenElement(node) && node.getAttribute('tabindex') === '-1';
        })
        .forEach((element: Element) => {
          if (element.getAttribute('role') === 'switch') {
            element.setAttribute('tabindex', '0');
          } else if (element.getAttribute('type') === 'checkbox' || element.getAttribute('type') === 'file') {
            element.setAttribute('tabindex', '-1');
          } else {
            element.removeAttribute('tabindex');
          }
        });
    } else if (animationEnded) {
      Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => {
          return headerRef.current !== null && !headerRef.current.contains(node) && !hiddenElement(node) && node.getAttribute('tabindex') !== '-1';
        })
        .forEach((element: Element) => {
          element.setAttribute('tabindex', '-1');
        });
    }
  }, [animationEnded, loaded]);

  return (
    <header ref={headerRef} hidden={loaded} className={`Header${loaded ? ' -fadeIn' : ' -progress'}`} onAnimationEnd={onAnimationEndCallback}>
      <div hidden={starting}>
        <div className='Header__forkMeOnGitHub'>
          <a href='https://github.com/Korilakkuma/XSound.app' target='_blank' rel='noopener noreferrer'>
            Fork me on GitHub
          </a>
        </div>
        <div>
          <h1 id={labelId} className='Header__logo'>
            <img src='/assets/images/logo-v09.png' alt='XSound.app' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
          </h1>
          <div id={describeId} className='Header__intro'>
            <span className='Header__moveLeft'>
              XSound.app is Web Music Application by <TextLink href='https://xsound.jp' text='XSound (Web Audio API Library)' external={true} lang='en' />.
            </span>
            <span className='Header__moveRight'>Synthesizer, Effects, Visualization, Multi-Track Recording, Visual Audio Sprite ...</span>
            <span className='Header__moveLeft'>Moreover, enable to use external devices such as Audio Interfaces, MIDI.</span>
          </div>
          <nav className='Header__startButton'>
            <button type='button' onClick={onClickSetupCallback}>
              Start Application
            </button>
          </nav>
        </div>
      </div>
      {starting ? <ProgressBar label={`Now Loading ... (${rate} %)`} rate={rate} /> : null}
    </header>
  );
};
