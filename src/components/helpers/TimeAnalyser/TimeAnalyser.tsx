import type React from 'react';
import type { Channel } from 'src/types';

import { useState, useMemo, useCallback } from 'react';

import { Canvas } from '/src/components/atoms/Canvas';
import { SVG } from '/src/components/atoms/SVG';

import { X } from 'xsound';

import type { VisualizerType } from '/src/types';
import type { TimeParams } from 'xsound';

export type Props = {
  active: boolean;
  type: VisualizerType;
};

export const TimeAnalyser: React.FC<Props> = ({ active, type }) => {
  const [showTimeAnalyser, setShowTimeAnalyser] = useState<Channel>('left');

  const timeParams: TimeParams = useMemo(() => {
    return {
      interval: -1,
      type: 'uint',
      styles: {
        shape: 'line',
        grid: 'rgba(255, 255, 255, 0.2)',
        font: {
          family: 'Arial',
          size: '12px',
          style: 'normal',
          weight: 'normal'
        },
        width: 1.5,
        right: 15
      }
    };
  }, []);

  const onClickChannelCallback = useCallback(() => {
    setShowTimeAnalyser(showTimeAnalyser === 'right' ? 'left' : 'right');
  }, [showTimeAnalyser]);

  const setElementForLeftChannelCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      X('mixer').module('analyser').domain('time', 0).setup(element).param(timeParams).activate();
      X('oneshot').module('analyser').domain('time', 0).setup(element).param(timeParams).activate();
      X('audio').module('analyser').domain('time', 0).setup(element).param(timeParams).activate();
      X('stream').module('analyser').domain('time', 0).setup(element).param(timeParams).activate();
      X('noise').module('analyser').domain('time', 0).setup(element).param(timeParams).activate();
    },
    [timeParams]
  );

  const setElementForRightChannelCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      X('mixer').module('analyser').domain('time', 1).setup(element).param(timeParams).activate();
      X('oneshot').module('analyser').domain('time', 1).setup(element).param(timeParams).activate();
      X('audio').module('analyser').domain('time', 1).setup(element).param(timeParams).activate();
      X('stream').module('analyser').domain('time', 1).setup(element).param(timeParams).activate();
      X('noise').module('analyser').domain('time', 1).setup(element).param(timeParams).activate();
    },
    [timeParams]
  );

  return (
    <dl className='TimeAnalyser'>
      <dt>
        <label>
          <button
            type='button'
            className={`TimeAnalyser__channelSelector -${showTimeAnalyser}`}
            aria-label='Select Channel'
            tabIndex={active ? 0 : -1}
            onClick={onClickChannelCallback}
          />
          <span>Time Domain</span>
          <span>{showTimeAnalyser}</span>
          <span>channel</span>
        </label>
      </dt>
      <dd hidden={showTimeAnalyser === 'right'}>
        {type === 'bitmap' && <Canvas width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForRightChannelCallback} />}
        {type === 'vector' && <SVG width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForRightChannelCallback} />}
      </dd>
      <dd hidden={showTimeAnalyser === 'left'}>
        {type === 'bitmap' && <Canvas width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForLeftChannelCallback} />}
        {type === 'vector' && <SVG width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForLeftChannelCallback} />}
      </dd>
    </dl>
  );
};
