import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const PreampFieldset: React.FC = () => {
  const [preamp, setPreamp] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('preamp').activate();
      X('oneshot').module('preamp').activate();
      X('audio').module('preamp').activate();
      X('stream').module('preamp').activate();
      X('noise').module('preamp').activate();
    } else {
      X('mixer').module('preamp').deactivate();
      X('oneshot').module('preamp').deactivate();
      X('audio').module('preamp').deactivate();
      X('stream').module('preamp').deactivate();
      X('noise').module('preamp').deactivate();
    }

    setPreamp(checked);
  }, []);

  const onChangeLevelCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const level = event.currentTarget.valueAsNumber;

    X('mixer').module('preamp').param({ preamp: { level } });
    X('oneshot').module('preamp').param({ preamp: { level } });
    X('audio').module('preamp').param({ preamp: { level } });
    X('stream').module('preamp').param({ preamp: { level } });
    X('noise').module('preamp').param({ preamp: { level } });
  }, []);

  const onChangeGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const gain = event.currentTarget.valueAsNumber;

    const param = { preamp: { pre: { gain } } };

    X('mixer').module('preamp').param(param);
    X('oneshot').module('preamp').param(param);
    X('audio').module('preamp').param(param);
    X('stream').module('preamp').param(param);
    X('noise').module('preamp').param(param);
  }, []);

  const onChangeLeadGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const lead = event.currentTarget.valueAsNumber;

    const param = { preamp: { pre: { lead } } };

    X('mixer').module('preamp').param(param);
    X('oneshot').module('preamp').param(param);
    X('audio').module('preamp').param(param);
    X('stream').module('preamp').param(param);
    X('noise').module('preamp').param(param);
  }, []);

  const onChangeBassCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const bass = event.currentTarget.valueAsNumber;

    const param = { preamp: { post: { bass } } };

    X('mixer').module('preamp').param(param);
    X('oneshot').module('preamp').param(param);
    X('audio').module('preamp').param(param);
    X('stream').module('preamp').param(param);
    X('noise').module('preamp').param(param);
  }, []);

  const onChangeMiddleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const middle = event.currentTarget.valueAsNumber;

    const param = { preamp: { post: { middle } } };

    X('mixer').module('preamp').param(param);
    X('oneshot').module('preamp').param(param);
    X('audio').module('preamp').param(param);
    X('stream').module('preamp').param(param);
    X('noise').module('preamp').param(param);
  }, []);

  const onChangeTrebleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const treble = event.currentTarget.valueAsNumber;

    const param = { preamp: { post: { treble } } };

    X('mixer').module('preamp').param(param);
    X('oneshot').module('preamp').param(param);
    X('audio').module('preamp').param(param);
    X('stream').module('preamp').param(param);
    X('noise').module('preamp').param(param);
  }, []);

  return (
    <div className='PreampFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='Preamp' checked={preamp} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <ParameterController label='Level' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeLevelCallback} />
        <ParameterController label='Gain' autoupdate={false} defaultValue={0.5} min={0} max={1} step={0.05} onChange={onChangeGainCallback} />
        <ParameterController label='Lead Gain' autoupdate={false} defaultValue={0.5} min={0} max={1} step={0.05} onChange={onChangeLeadGainCallback} />
        <ParameterController label='Bass' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChangeBassCallback} />
        <ParameterController label='Middle' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChangeMiddleCallback} />
        <ParameterController label='Treble' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChangeTrebleCallback} />
      </Fieldset>
    </div>
  );
};
