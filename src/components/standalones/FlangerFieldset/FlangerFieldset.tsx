import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const FlangerFieldset: React.FC = () => {
  const [flanger, setFlanger] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('flanger').activate();
      X('oneshot').module('flanger').activate();
      X('audio').module('flanger').activate();
      X('stream').module('flanger').activate();
      X('noise').module('flanger').activate();
    } else {
      X('mixer').module('flanger').deactivate();
      X('oneshot').module('flanger').deactivate();
      X('audio').module('flanger').deactivate();
      X('stream').module('flanger').deactivate();
      X('noise').module('flanger').deactivate();
    }

    setFlanger(checked);
  }, []);

  const onChangeTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber / 1000;

    X('mixer').module('flanger').param({ time });
    X('oneshot').module('flanger').param({ time });
    X('audio').module('flanger').param({ time });
    X('stream').module('flanger').param({ time });
    X('noise').module('flanger').param({ time });
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ depth });
    X('oneshot').module('flanger').param({ depth });
    X('audio').module('flanger').param({ depth });
    X('stream').module('flanger').param({ depth });
    X('noise').module('flanger').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ rate });
    X('oneshot').module('flanger').param({ rate });
    X('audio').module('flanger').param({ rate });
    X('stream').module('flanger').param({ rate });
    X('noise').module('flanger').param({ rate });
  }, []);

  const onChangeDryCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const dry = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ dry });
    X('oneshot').module('flanger').param({ dry });
    X('audio').module('flanger').param({ dry });
    X('stream').module('flanger').param({ dry });
    X('noise').module('flanger').param({ dry });
  }, []);

  const onChangeWetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const wet = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ wet });
    X('oneshot').module('flanger').param({ wet });
    X('audio').module('flanger').param({ wet });
    X('stream').module('flanger').param({ wet });
    X('noise').module('flanger').param({ wet });
  }, []);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ tone });
    X('oneshot').module('flanger').param({ tone });
    X('audio').module('flanger').param({ tone });
    X('stream').module('flanger').param({ tone });
    X('noise').module('flanger').param({ tone });
  }, []);

  const onChangeFeedbackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const feedback = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ feedback });
    X('oneshot').module('flanger').param({ feedback });
    X('audio').module('flanger').param({ feedback });
    X('stream').module('flanger').param({ feedback });
    X('noise').module('flanger').param({ feedback });
  }, []);

  return (
    <div className='FlangerFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='Flanger' checked={flanger} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <ParameterController label='Time' autoupdate={false} defaultValue={0} min={0} max={10} step={0.05} onChange={onChangeTimeCallback} />
        <ParameterController label='Depth' autoupdate={false} defaultValue={0} min={0} max={1} step={0.01} onChange={onChangeDepthCallback} />
        <ParameterController label='Rate' autoupdate={false} defaultValue={0} min={0} max={10} step={0.05} onChange={onChangeRateCallback} />
        <ParameterController label='Dry' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeDryCallback} />
        <ParameterController label='Wet' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeWetCallback} />
        <ParameterController label='Tone' autoupdate={false} defaultValue={4000} min={20} max={8000} step={1} onChange={onChangeToneCallback} />
        <ParameterController label='Feedback' autoupdate={false} defaultValue={0} min={0} max={0.95} step={0.05} onChange={onChangeFeedbackCallback} />
      </Fieldset>
    </div>
  );
};
