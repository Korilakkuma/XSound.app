import type React from 'react';
import type { DelayType } from 'xsound';

import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Select } from '/src/components/atoms/Select';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const DelayFieldset: React.FC = () => {
  const [delay, setDelay] = useState<boolean>(false);
  const [type, setType] = useState<DelayType>('standard');
  const [stereo, setStereo] = useState<number>(1);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('delay').activate();
      X('oneshot').module('delay').activate();
      X('audio').module('delay').activate();
      X('stream').module('delay').activate();
      X('noise').module('delay').activate();
    } else {
      X('mixer').module('delay').deactivate();
      X('oneshot').module('delay').deactivate();
      X('audio').module('delay').deactivate();
      X('stream').module('delay').deactivate();
      X('noise').module('delay').deactivate();
    }

    setDelay(checked);
  }, []);

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.currentTarget.value;

    switch (type) {
      case 'standard':
      case 'pingpong': {
        X('mixer').module('delay').param({ type });
        X('oneshot').module('delay').param({ type });
        X('audio').module('delay').param({ type });
        X('stream').module('delay').param({ type });
        X('noise').module('delay').param({ type });

        setType(type);
        setStereo(1);

        break;
      }

      case 'stereo': {
        X('mixer').module('delay').param({ type });
        X('oneshot').module('delay').param({ type });
        X('audio').module('delay').param({ type });
        X('stream').module('delay').param({ type });
        X('noise').module('delay').param({ type });

        setType(type);

        break;
      }
    }
  }, []);

  const onChangeTimeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const time = event.currentTarget.valueAsNumber / 1000;

      const times: [number, number] = [stereo * time, time];

      X('mixer').module('delay').param({ time: times });
      X('oneshot').module('delay').param({ time: times });
      X('audio').module('delay').param({ time: times });
      X('stream').module('delay').param({ time: times });
      X('noise').module('delay').param({ time: times });
    },
    [stereo]
  );

  const onChangeDryCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const dry = event.currentTarget.valueAsNumber;

    X('mixer').module('delay').param({ dry });
    X('oneshot').module('delay').param({ dry });
    X('audio').module('delay').param({ dry });
    X('stream').module('delay').param({ dry });
    X('noise').module('delay').param({ dry });
  }, []);

  const onChangeWetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const wet = event.currentTarget.valueAsNumber;

    const wets: [number, number] = [wet, wet];

    X('mixer').module('delay').param({ wet: wets });
    X('oneshot').module('delay').param({ wet: wets });
    X('audio').module('delay').param({ wet: wets });
    X('stream').module('delay').param({ wet: wets });
    X('noise').module('delay').param({ wet: wets });
  }, []);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    const tones: [number, number] = [tone, tone];

    X('mixer').module('delay').param({ tone: tones });
    X('oneshot').module('delay').param({ tone: tones });
    X('audio').module('delay').param({ tone: tones });
    X('stream').module('delay').param({ tone: tones });
    X('noise').module('delay').param({ tone: tones });
  }, []);

  const onChangeFeedbackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const feedback = event.currentTarget.valueAsNumber;

    const feedbacks: [number, number] = [feedback, feedback];

    X('mixer').module('delay').param({ feedback: feedbacks });
    X('oneshot').module('delay').param({ feedback: feedbacks });
    X('audio').module('delay').param({ feedback: feedbacks });
    X('stream').module('delay').param({ feedback: feedbacks });
    X('noise').module('delay').param({ feedback: feedbacks });
  }, []);

  const onChangeStereoCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const stereo = event.currentTarget.valueAsNumber;

      const times = X('mixer').module('delay').param('time');

      if (Array.isArray(times) && times.length === 2) {
        times[0] = stereo * times[1];

        X('mixer').module('delay').param({ time: times });
        X('oneshot').module('delay').param({ time: times });
        X('audio').module('delay').param({ time: times });
        X('stream').module('delay').param({ time: times });
        X('noise').module('delay').param({ time: times });
      }

      setStereo(stereo);
    },
    [stereo]
  );

  return (
    <div className='DelayFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='Delay' checked={delay} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <Select
          label='Select Delay Type'
          values={['standard', 'pingpong', 'stereo']}
          texts={['standard', 'ping pong', 'stereo']}
          disabled={false}
          textTransform={true}
          defaultValue='standard'
          onChange={onChangeTypeCallback}
        />
        <ParameterController label='Time' autoupdate={false} defaultValue={0} min={0} max={1000} step={1} onChange={onChangeTimeCallback} />
        <ParameterController label='Dry' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeDryCallback} />
        <ParameterController label='Wet' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeWetCallback} />
        <ParameterController label='Tone' autoupdate={false} defaultValue={4000} min={20} max={8000} step={1} onChange={onChangeToneCallback} />
        <ParameterController label='Feedback' autoupdate={false} defaultValue={0} min={0} max={0.95} step={0.05} onChange={onChangeFeedbackCallback} />
        {type === 'stereo' && (
          <ParameterController label='Stereo' autoupdate={false} defaultValue={1} min={0} max={2} step={0.05} onChange={onChangeStereoCallback} />
        )}
      </Fieldset>
    </div>
  );
};
