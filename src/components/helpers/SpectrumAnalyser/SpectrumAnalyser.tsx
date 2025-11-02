import type React from 'react';
import type { Channel } from 'src/types';

import { useState, useMemo, useCallback } from 'react';

import { Canvas } from '/src/components/atoms/Canvas';
import { SVG } from '/src/components/atoms/SVG';

import { X } from 'xsound';

import type { VisualizerType } from '/src/types';
import type { FFTParams } from 'xsound';

export type Props = {
  active: boolean;
  type: VisualizerType;
};

export const SpectrumAnalyser: React.FC<Props> = ({ active, type }) => {
  const [showSpectrumAnalyser, setShowSpectrumAnalyser] = useState<Channel>('left');

  const fftParams: FFTParams = useMemo(() => {
    return {
      interval: -1,
      type: 'float',
      scale: 'logarithmic',
      styles: {
        shape: 'line',
        grid: 'rgba(255, 255, 255, 0.2)',
        font: {
          family: 'Arial',
          size: '12px',
          style: 'normal',
          weight: 'normal'
        },
        width: 1,
        right: 15,
        left: 40
      }
    };
  }, []);

  const onClickChannelCallback = useCallback(() => {
    setShowSpectrumAnalyser(showSpectrumAnalyser === 'right' ? 'left' : 'right');
  }, [showSpectrumAnalyser]);

  const setElementForLeftChannelCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      X('mixer').module('analyser').domain('fft', 0).setup(element).param(fftParams).activate();
      X('oneshot').module('analyser').domain('fft', 0).setup(element).param(fftParams).activate();
      X('audio').module('analyser').domain('fft', 0).setup(element).param(fftParams).activate();
      X('stream').module('analyser').domain('fft', 0).setup(element).param(fftParams).activate();
      X('noise').module('analyser').domain('fft', 0).setup(element).param(fftParams).activate();
    },
    [fftParams]
  );

  const setElementForRightChannelCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      X('mixer').module('analyser').domain('fft', 1).setup(element).param(fftParams).activate();
      X('oneshot').module('analyser').domain('fft', 1).setup(element).param(fftParams).activate();
      X('audio').module('analyser').domain('fft', 1).setup(element).param(fftParams).activate();
      X('stream').module('analyser').domain('fft', 1).setup(element).param(fftParams).activate();
      X('noise').module('analyser').domain('fft', 1).setup(element).param(fftParams).activate();
    },
    [fftParams]
  );

  return (
    <dl className='SpectrumAnalyser'>
      <dt>
        <label>
          <button
            type='button'
            className={`SpectrumAnalyser__channelSelector -${showSpectrumAnalyser}`}
            aria-label='Select Channel'
            tabIndex={active ? 0 : -1}
            onClick={onClickChannelCallback}
          />
          <span>Frequency Domain</span>
          <span>{showSpectrumAnalyser}</span>
          <span>channel</span>
        </label>
      </dt>
      <dd hidden={showSpectrumAnalyser === 'right'}>
        {type === 'bitmap' && <Canvas width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForRightChannelCallback} />}
        {type === 'vector' && <SVG width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForRightChannelCallback} />}
      </dd>
      <dd hidden={showSpectrumAnalyser === 'left'}>
        {type === 'bitmap' && <Canvas width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForLeftChannelCallback} />}
        {type === 'vector' && <SVG width={420} height={120} hasHoverStyle={false} setElementCallback={setElementForLeftChannelCallback} />}
      </dd>
    </dl>
  );
};
