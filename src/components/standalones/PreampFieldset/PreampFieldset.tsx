import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const PreampFieldset: React.FC = () => {
  const [preamp, setPreamp] = useState<boolean>(false);
  const [cabinet, setCabinet] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('preamp').activate();
      X('oneshot').module('preamp').activate();
      X('audio').module('preamp').activate();
      X('stream').module('preamp').activate();
      X('noise').module('preamp').activate();

      X('mixer')
        .module('preamp')
        .param({ cabinet: { state: true } });
      X('oneshot')
        .module('preamp')
        .param({ cabinet: { state: true } });
      X('audio')
        .module('preamp')
        .param({ cabinet: { state: true } });
      X('stream')
        .module('preamp')
        .param({ cabinet: { state: true } });
      X('noise')
        .module('preamp')
        .param({ cabinet: { state: true } });
    } else {
      X('mixer').module('preamp').deactivate();
      X('oneshot').module('preamp').deactivate();
      X('audio').module('preamp').deactivate();
      X('stream').module('preamp').deactivate();
      X('noise').module('preamp').deactivate();

      X('mixer')
        .module('preamp')
        .param({ cabinet: { state: false } });
      X('oneshot')
        .module('preamp')
        .param({ cabinet: { state: false } });
      X('audio')
        .module('preamp')
        .param({ cabinet: { state: false } });
      X('stream')
        .module('preamp')
        .param({ cabinet: { state: false } });
      X('noise')
        .module('preamp')
        .param({ cabinet: { state: false } });
    }

    setPreamp(checked);
    setCabinet(checked);
  }, []);

  const onChangeLevelCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const level = event.currentTarget.valueAsNumber;

    X('mixer').module('preamp').param({ level });
    X('oneshot').module('preamp').param({ level });
    X('audio').module('preamp').param({ level });
    X('stream').module('preamp').param({ level });
    X('noise').module('preamp').param({ level });
  }, []);

  const onChangeGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const gain = event.currentTarget.valueAsNumber;

    X('mixer').module('preamp').param({ pre: { gain } });
    X('oneshot').module('preamp').param({ pre: { gain } });
    X('audio').module('preamp').param({ pre: { gain } });
    X('stream').module('preamp').param({ pre: { gain } });
    X('noise').module('preamp').param({ pre: { gain } });
  }, []);

  const onChangeLeadGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const lead = event.currentTarget.valueAsNumber;

    X('mixer').module('preamp').param({ pre: { lead } });
    X('oneshot').module('preamp').param({ pre: { lead } });
    X('audio').module('preamp').param({ pre: { lead } });
    X('stream').module('preamp').param({ pre: { lead } });
    X('noise').module('preamp').param({ pre: { lead } });
  }, []);

  const onChangeBassCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const bass = event.currentTarget.valueAsNumber;

    X('mixer').module('preamp').param({ post: { bass } });
    X('oneshot').module('preamp').param({ post: { bass } });
    X('audio').module('preamp').param({ post: { bass } });
    X('stream').module('preamp').param({ post: { bass } });
    X('noise').module('preamp').param({ post: { bass } });
  }, []);

  const onChangeMiddleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const middle = event.currentTarget.valueAsNumber;

    X('mixer').module('preamp').param({ post: { middle } });
    X('oneshot').module('preamp').param({ post: { middle } });
    X('audio').module('preamp').param({ post: { middle } });
    X('stream').module('preamp').param({ post: { middle } });
    X('noise').module('preamp').param({ post: { middle } });
  }, []);

  const onChangeTrebleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const treble = event.currentTarget.valueAsNumber;

    X('mixer').module('preamp').param({ post: { treble } });
    X('oneshot').module('preamp').param({ post: { treble } });
    X('audio').module('preamp').param({ post: { treble } });
    X('stream').module('preamp').param({ post: { treble } });
    X('noise').module('preamp').param({ post: { treble } });
  }, []);

  const onChangeCabinetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    X('mixer').module('preamp').param({ cabinet: { state } });
    X('oneshot').module('preamp').param({ post: { state } });
    X('audio').module('preamp').param({ post: { state } });
    X('stream').module('preamp').param({ post: { state } });
    X('noise').module('preamp').param({ post: { state } });

    setCabinet(state);
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
        <Switch label='cabinet' checked={cabinet} labelAsText={true} onChange={onChangeCabinetCallback} />
      </Fieldset>
    </div>
  );
};
