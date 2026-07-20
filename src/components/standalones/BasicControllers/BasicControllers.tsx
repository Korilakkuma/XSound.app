import type React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'xsound';

import { changeAnalyserState, changeMMLState } from '/src/slices';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const BasicControllers: React.FC = () => {
  const [analyserState, setAnalyserState] = useState<boolean>(false);
  const [mmlState, setMMLState] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onChangeGlideCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber;

    X('oscillator').module('glide').param({ time });
    window.clonedXSound('oscillator').module('glide').param({ time });
  }, []);

  const onChangeTransposeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('oneshot').param({ transpose: event.currentTarget.valueAsNumber });
  }, []);

  const onChangeAnalyserStateCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeAnalyserState(event.currentTarget.checked));
      setAnalyserState(!analyserState);
    },
    [dispatch, analyserState]
  );

  const onChangeMMLStateCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeMMLState(event.currentTarget.checked));
      setMMLState(!mmlState);
    },
    [dispatch, mmlState]
  );

  return (
    <div className='BasicControllers'>
      <ParameterController label='Glide' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeGlideCallback} />
      <ParameterController label='Transpose' autoupdate={false} defaultValue={0} min={-6} max={6} step={1} onChange={onChangeTransposeCallback} />
      <Switch label='Analyser' checked={analyserState} labelAsText={true} controls='analyser-fieldset' onChange={onChangeAnalyserStateCallback} />
      <Switch label='MML' checked={mmlState} labelAsText={true} controls='mml-fieldset' onChange={onChangeMMLStateCallback} />
    </div>
  );
};
