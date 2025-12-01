import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { X } from 'xsound';

import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';
import { TimeOverviewer } from '/src/components/helpers/TimeOverviewer';
import { TimeAnalyser } from '/src/components/helpers/TimeAnalyser';
import { SpectrumAnalyser } from '/src/components/helpers/SpectrumAnalyser';
import { getStorage } from '/src/utils';

import type { RootState } from '/src/store';
import type { CustomizedParameters, VisualizerType } from '/src/types';
import type { AnalyserParams } from 'xsound';

export const Analyser: React.FC = () => {
  const [analyser, setAnalyser] = useState<boolean>(false);

  const active = useSelector((state: RootState) => state.analyserState);

  const storage: CustomizedParameters = useMemo(() => {
    return getStorage();
  }, []);

  const type: VisualizerType = useMemo(() => {
    return storage.analyser?.visualizer || 'vector';
  }, [storage]);

  const onChangeModeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('audio').module('analyser').domain('timeoverview', 0).param({ mode: 'sprite' });
      X('audio').module('analyser').domain('timeoverview', 1).param({ mode: 'sprite' });
      X('audio').param({ loop: true });
    } else {
      const currentTime = X('audio').param('currentTime');
      const duration = X('audio').param('duration');

      X('audio').module('analyser').domain('timeoverview', 0).param({ mode: 'update' });
      X('audio').module('analyser').domain('timeoverview', 1).param({ mode: 'update' });
      X('audio').param({ loop: false });
      X('audio').stop().start(currentTime, duration);
    }

    setAnalyser(checked);
  }, []);

  const onChangeIntervalCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.valueAsNumber;

    X('mixer')
      .module('analyser')
      .domain('time')
      .param({ interval: value > 0 ? value : -1 });
    X('mixer')
      .module('analyser')
      .domain('fft')
      .param({ interval: value > 0 ? value : -1 });
    X('oneshot')
      .module('analyser')
      .domain('time')
      .param({ interval: value > 0 ? value : -1 });
    X('oneshot')
      .module('analyser')
      .domain('fft')
      .param({ interval: value > 0 ? value : -1 });
    X('audio')
      .module('analyser')
      .domain('time')
      .param({ interval: value > 0 ? value : -1 });
    X('audio')
      .module('analyser')
      .domain('fft')
      .param({ interval: value > 0 ? value : -1 });
    X('stream')
      .module('analyser')
      .domain('time')
      .param({ interval: value > 0 ? value : -1 });
    X('stream')
      .module('analyser')
      .domain('fft')
      .param({ interval: value > 0 ? value : -1 });
    X('noise')
      .module('analyser')
      .domain('time')
      .param({ interval: value > 0 ? value : -1 });
    X('noise')
      .module('analyser')
      .domain('fft')
      .param({ interval: value > 0 ? value : -1 });
  }, []);

  const onChangeSmoothingCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const smoothingTimeConstant = event.currentTarget.valueAsNumber;

    X('mixer').module('analyser').param({ smoothingTimeConstant });
    X('oneshot').module('analyser').param({ smoothingTimeConstant });
    X('audio').module('analyser').param({ smoothingTimeConstant });
    X('stream').module('analyser').param({ smoothingTimeConstant });
    X('noise').module('analyser').param({ smoothingTimeConstant });
  }, []);

  useEffect(() => {
    const analyserParams: AnalyserParams = {
      fftSize: 2048,
      minDecibels: -60,
      maxDecibels: 0,
      smoothingTimeConstant: 0.8
    };

    const logarithmicFrequencies = [62.5, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

    X('mixer').module('analyser').param(analyserParams);
    X('oneshot').module('analyser').param(analyserParams);
    X('audio').module('analyser').param(analyserParams);
    X('stream').module('analyser').param(analyserParams);
    X('noise').module('analyser').param(analyserParams);

    X('mixer').module('analyser').domain('fft').param({ logarithmicFrequencies });
    X('oneshot').module('analyser').domain('fft').param({ logarithmicFrequencies });
    X('audio').module('analyser').domain('fft', 0).param({ logarithmicFrequencies });
    X('audio').module('analyser').domain('fft', 1).param({ logarithmicFrequencies });
    X('stream').module('analyser').domain('fft').param({ logarithmicFrequencies });
    X('noise').module('analyser').domain('fft').param({ logarithmicFrequencies });

    X('mixer').module('analyser').domain('time').activate();
    X('mixer').module('analyser').domain('fft').activate();
    X('oneshot').module('analyser').domain('time').activate();
    X('oneshot').module('analyser').domain('fft').activate();
    X('audio').module('analyser').domain('time').activate();
    X('audio').module('analyser').domain('fft').activate();
    X('stream').module('analyser').domain('time').activate();
    X('stream').module('analyser').domain('fft').activate();
    X('noise').module('analyser').domain('time').activate();
    X('noise').module('analyser').domain('fft').activate();

    const font = {
      family: 'Arial, sans-serif',
      size: '10px',
      style: 'normal'
    };

    const timeOverViewStyles = {
      ...X('audio').module('analyser').domain('timeoverview', 0).param('styles'),
      font
    };

    const timeStyles = {
      ...X('mixer').module('analyser').domain('time').param('styles'),
      font
    };

    const spectrumStyles = {
      ...X('mixer').module('analyser').domain('fft').param('styles'),
      font
    };

    X('audio').module('analyser').domain('timeoverview', 0).param({ styles: timeOverViewStyles });
    X('audio').module('analyser').domain('timeoverview', 1).param({ styles: timeOverViewStyles });

    X('mixer').module('analyser').domain('time').param({ styles: timeStyles });
    X('mixer').module('analyser').domain('fft').param({ styles: spectrumStyles });
    X('oneshot').module('analyser').domain('time').param({ styles: timeStyles });
    X('oneshot').module('analyser').domain('fft').param({ styles: spectrumStyles });
    X('audio').module('analyser').domain('time', 0).param({ styles: timeStyles });
    X('audio').module('analyser').domain('time', 1).param({ styles: timeStyles });
    X('audio').module('analyser').domain('fft', 0).param({ styles: spectrumStyles });
    X('audio').module('analyser').domain('fft', 1).param({ styles: spectrumStyles });
    X('stream').module('analyser').domain('time').param({ styles: timeStyles });
    X('stream').module('analyser').domain('fft').param({ styles: spectrumStyles });
    X('noise').module('analyser').domain('time').param({ styles: timeStyles });
    X('noise').module('analyser').domain('fft').param({ styles: spectrumStyles });
  }, []);

  return (
    <div id='analyser-fieldset' aria-hidden={!active} className={`Analyser${active ? ' -active' : ''}`}>
      <div className='Analyser__viewer'>
        <TimeOverviewer active={active} type={type} />
        <TimeAnalyser active={active} type={type} />
        <SpectrumAnalyser active={active} type={type} />
      </div>
      <div className='Analyser__controllers'>
        <Switch label='Audio Sprite' checked={analyser} labelAsText={true} tabIndex={active ? 0 : -1} onChange={onChangeModeCallback} />
        <div className='Analyser__updater'>
          <ParameterController
            label='Interval'
            autoupdate={false}
            defaultValue={0}
            min={0}
            max={1000}
            step={10}
            tabIndex={active ? 0 : -1}
            onChange={onChangeIntervalCallback}
          />
          <ParameterController
            label='Smoothing'
            autoupdate={false}
            defaultValue={0.8}
            min={0}
            max={1}
            step={0.05}
            tabIndex={active ? 0 : -1}
            onChange={onChangeSmoothingCallback}
          />
        </div>
      </div>
    </div>
  );
};
