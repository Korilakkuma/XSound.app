import type React from 'react';
import type { PreampType, PreampParams } from 'xsound';

import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Switch } from '/src/components/atoms/Switch';
import { Select } from '/src/components/atoms/Select';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const AmpSimulatorFieldset: React.FC = () => {
  const [preamp, setPreamp] = useState<boolean>(false);
  const [cabinet, setCabinet] = useState<boolean>(false);
  const [preampType, setPreampType] = useState<PreampType>('marshall');

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
    setCabinet(checked);
  }, []);

  const onChangePreamplifier = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const type = event.currentTarget.value;

      switch (type) {
        case 'marshall': {
          const param: PreampParams = {
            state: preamp,
            type: 'marshall',
            preamp: {
              state: true,
              level: 0,
              samples: 8192,
              pre: { state: true, gain: 0.5, lead: 0.5 },
              post: { state: true },
              cabinet: { state: cabinet }
            }
          };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);

          setPreampType(type);
          break;
        }

        case 'mesa/boogie': {
          const param: PreampParams = {
            state: preamp,
            type: 'mesa/boogie',
            preamp: {
              state: true,
              pre: {
                state: true,
                gain: 0.5,
                level: 0,
                bass: 0,
                middle: 0,
                treble: 0,
                samples: 8192
              },
              post: {
                state: true,
                fc100: 0,
                fc360: 0,
                fc720: 0,
                fc1600: 0,
                fc4800: 0
              },
              cabinet: { state: cabinet }
            }
          };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);

          setPreampType(type);
          break;
        }

        case 'fender': {
          const param: PreampParams = {
            state: preamp,
            type: 'fender',
            preamp: {
              state: true,
              pre: {
                state: true,
                gain: 0.5,
                level: 0,
                bass: 0,
                middle: 0,
                treble: 0,
                samples: 8192
              },
              post: {
                state: true,
                inch: 12,
                tilt: true
              },
              cabinet: { state: cabinet }
            }
          };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);

          setPreampType(type);
          break;
        }
      }
    },
    [preamp, cabinet]
  );

  const onChangeLevelCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const level = event.currentTarget.valueAsNumber;

      switch (preampType) {
        case 'marshall': {
          const param = { preamp: { level } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }

        case 'mesa/boogie':
        case 'fender': {
          const param = { preamp: { pre: { level } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }
      }
    },
    [preampType]
  );

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

  const onChangeBassCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const bass = event.currentTarget.valueAsNumber;

      switch (preampType) {
        case 'marshall': {
          const param = { preamp: { post: { bass } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }

        case 'mesa/boogie':
        case 'fender': {
          const param = { preamp: { pre: { bass } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }
      }
    },
    [preampType]
  );

  const onChangeMiddleCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const middle = event.currentTarget.valueAsNumber;

      switch (preampType) {
        case 'marshall': {
          const param = { preamp: { post: { middle } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }

        case 'mesa/boogie':
        case 'fender': {
          const param = { preamp: { pre: { middle } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }
      }
    },
    [preampType]
  );

  const onChangeTrebleCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const treble = event.currentTarget.valueAsNumber;

      switch (preampType) {
        case 'marshall': {
          const param = { preamp: { post: { treble } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }

        case 'mesa/boogie':
        case 'fender': {
          const param = { preamp: { pre: { treble } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }
      }
    },
    [preampType]
  );

  const onChange100HzCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (preampType !== 'mesa/boogie') {
        return;
      }

      const gain = event.currentTarget.valueAsNumber;

      const param = { preamp: { post: { fc100: gain } } };

      X('mixer').module('preamp').param(param);
      X('oneshot').module('preamp').param(param);
      X('audio').module('preamp').param(param);
      X('stream').module('preamp').param(param);
      X('noise').module('preamp').param(param);
    },
    [preampType]
  );

  const onChange360HzCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (preampType !== 'mesa/boogie') {
        return;
      }

      const gain = event.currentTarget.valueAsNumber;

      const param = { preamp: { post: { fc360: gain } } };

      X('mixer').module('preamp').param(param);
      X('oneshot').module('preamp').param(param);
      X('audio').module('preamp').param(param);
      X('stream').module('preamp').param(param);
      X('noise').module('preamp').param(param);
    },
    [preampType]
  );

  const onChange720HzCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (preampType !== 'mesa/boogie') {
        return;
      }

      const gain = event.currentTarget.valueAsNumber;

      const param = { preamp: { post: { fc720: gain } } };

      X('mixer').module('preamp').param(param);
      X('oneshot').module('preamp').param(param);
      X('audio').module('preamp').param(param);
      X('stream').module('preamp').param(param);
      X('noise').module('preamp').param(param);
    },
    [preampType]
  );

  const onChange1600HzCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (preampType !== 'mesa/boogie') {
        return;
      }

      const gain = event.currentTarget.valueAsNumber;

      const param = { preamp: { post: { fc1600: gain } } };

      X('mixer').module('preamp').param(param);
      X('oneshot').module('preamp').param(param);
      X('audio').module('preamp').param(param);
      X('stream').module('preamp').param(param);
      X('noise').module('preamp').param(param);
    },
    [preampType]
  );

  const onChange4800HzCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (preampType !== 'mesa/boogie') {
        return;
      }

      const gain = event.currentTarget.valueAsNumber;

      const param = { preamp: { post: { fc4800: gain } } };

      X('mixer').module('preamp').param(param);
      X('oneshot').module('preamp').param(param);
      X('audio').module('preamp').param(param);
      X('stream').module('preamp').param(param);
      X('noise').module('preamp').param(param);
    },
    [preampType]
  );

  const onChangeSpeakerSize = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (preampType !== 'fender') {
        return;
      }

      const inch = Number(event.currentTarget.value);

      switch (inch) {
        case -1:
        case 10:
        case 12:
        case 15: {
          const param = { preamp: { post: { inch } } };

          X('mixer').module('preamp').param(param);
          X('oneshot').module('preamp').param(param);
          X('audio').module('preamp').param(param);
          X('stream').module('preamp').param(param);
          X('noise').module('preamp').param(param);
          break;
        }
      }
    },
    [preampType]
  );

  const onChangeCabinet = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    const param = { preamp: { cabinet: { state: checked } } };

    X('mixer').module('preamp').param(param);
    X('oneshot').module('preamp').param(param);
    X('audio').module('preamp').param(param);
    X('stream').module('preamp').param(param);
    X('noise').module('preamp').param(param);

    setCabinet(checked);
  }, []);

  return (
    <div className='AmpSimulatorFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='Amp Simulator' checked={preamp} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <Select
          label='Select Preamplifier'
          values={['marshall', 'mesa/boogie', 'fender']}
          texts={['Marshall', 'Mesa/Boogie', 'Fender']}
          disabled={false}
          onChange={onChangePreamplifier}
        />
        <ParameterController label='Level' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeLevelCallback} />
        <ParameterController label='Gain' autoupdate={false} defaultValue={0.5} min={0} max={1} step={0.05} onChange={onChangeGainCallback} />
        {preampType === 'marshall' ? (
          <ParameterController label='Lead Gain' autoupdate={false} defaultValue={0.5} min={0} max={1} step={0.05} onChange={onChangeLeadGainCallback} />
        ) : null}
        <ParameterController label='Bass' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChangeBassCallback} />
        <ParameterController label='Middle' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChangeMiddleCallback} />
        <ParameterController label='Treble' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChangeTrebleCallback} />
        {preampType === 'mesa/boogie' ? (
          <>
            <ParameterController label='100 Hz' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChange100HzCallback} />
            <ParameterController label='360 Hz' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChange360HzCallback} />
            <ParameterController label='720 Hz' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChange720HzCallback} />
            <ParameterController label='1600 Hz' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChange1600HzCallback} />
            <ParameterController label='4800 Hz' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChange4800HzCallback} />
          </>
        ) : null}
        {preampType === 'fender' ? (
          <Select
            label='Select Speaker size'
            values={['-1', '10', '12', '15']}
            texts={['Not used', '10 inch', '12 inch', '15 inch']}
            defaultValue='12'
            disabled={false}
            onChange={onChangeSpeakerSize}
          />
        ) : null}
        <Switch label='Cabinet' checked={cabinet} labelAsText={true} onChange={onChangeCabinet} />
      </Fieldset>
    </div>
  );
};
