import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const ChorusFieldset: React.FC = () => {
  const [chorus, setChorus] = useState<boolean>(false);
  const [stereo, setStereo] = useState<number>(1);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('chorus').activate();
      X('oneshot').module('chorus').activate();
      X('audio').module('chorus').activate();
      X('stream').module('chorus').activate();
      X('noise').module('chorus').activate();
    } else {
      X('mixer').module('chorus').deactivate();
      X('oneshot').module('chorus').deactivate();
      X('audio').module('chorus').deactivate();
      X('stream').module('chorus').deactivate();
      X('noise').module('chorus').deactivate();
    }

    setChorus(checked);
  }, []);

  const onChangeTimeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const time = event.currentTarget.valueAsNumber / 1000;

      const times: [number, number] = [stereo * time, time];

      X('mixer').module('chorus').param({ time: times });
      X('oneshot').module('chorus').param({ time: times });
      X('audio').module('chorus').param({ time: times });
      X('stream').module('chorus').param({ time: times });
      X('noise').module('chorus').param({ time: times });
    },
    [stereo]
  );

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('chorus').param({ depth });
    X('oneshot').module('chorus').param({ depth });
    X('audio').module('chorus').param({ depth });
    X('stream').module('chorus').param({ depth });
    X('noise').module('chorus').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('chorus').param({ rate });
    X('oneshot').module('chorus').param({ rate });
    X('audio').module('chorus').param({ rate });
    X('stream').module('chorus').param({ rate });
    X('noise').module('chorus').param({ rate });
  }, []);

  const onChangeMixCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mix = event.currentTarget.valueAsNumber;

    X('mixer').module('chorus').param({ mix });
    X('oneshot').module('chorus').param({ mix });
    X('audio').module('chorus').param({ mix });
    X('stream').module('chorus').param({ mix });
    X('noise').module('chorus').param({ mix });
  }, []);

  const onChangeToneCallabck = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    X('mixer').module('chorus').param({ tone });
    X('oneshot').module('chorus').param({ tone });
    X('audio').module('chorus').param({ tone });
    X('stream').module('chorus').param({ tone });
    X('noise').module('chorus').param({ tone });
  }, []);

  const onChangeStereoCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const stereo = event.currentTarget.valueAsNumber;

      const times = X('mixer').module('chorus').param('time');

      if (Array.isArray(times) && times.length === 2) {
        times[0] = stereo * times[1];

        X('mixer').module('chorus').param({ time: times });
        X('oneshot').module('chorus').param({ time: times });
        X('audio').module('chorus').param({ time: times });
        X('stream').module('chorus').param({ time: times });
        X('noise').module('chorus').param({ time: times });
      }

      setStereo(stereo);
    },
    [stereo]
  );

  return (
    <div className='ChorusFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='Chorus' checked={chorus} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <ParameterController label='Time' autoupdate={false} defaultValue={0} min={0} max={50} step={1} onChange={onChangeTimeCallback} />
        <ParameterController label='Depth' autoupdate={false} defaultValue={0} min={0} max={1} step={0.01} onChange={onChangeDepthCallback} />
        <ParameterController label='Rate' autoupdate={false} defaultValue={0} min={0} max={1} step={0.01} onChange={onChangeRateCallback} />
        <ParameterController label='Mix' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeMixCallback} />
        <ParameterController label='Tone' autoupdate={false} defaultValue={4000} min={20} max={8000} step={1} onChange={onChangeToneCallabck} />
        <ParameterController label='Stereo' autoupdate={false} defaultValue={1} min={0} max={2} step={0.05} onChange={onChangeStereoCallback} />
      </Fieldset>
    </div>
  );
};
