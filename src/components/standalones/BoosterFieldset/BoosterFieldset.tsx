import type React from 'react';
import type { BoosterType, OverDriveType, DistortionType, FuzzType } from 'xsound';

import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Select } from '/src/components/atoms/Select';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

type BoosterTypes = BoosterType | OverDriveType | DistortionType | FuzzType;

export const BoosterFieldset: React.FC = () => {
  const [booster, setBooster] = useState<boolean>(false);
  const [boosterType, setBoosterType] = useState<BoosterTypes>('clean');

  const onChangeStateCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.currentTarget.checked;

      if (checked) {
        switch (boosterType) {
          case 'clean': {
            X('mixer').module('booster').activate();
            X('oneshot').module('booster').activate();
            X('audio').module('booster').activate();
            X('stream').module('booster').activate();
            X('noise').module('booster').activate();

            X('mixer').module('overdrive').deactivate();
            X('oneshot').module('overdrive').deactivate();
            X('audio').module('overdrive').deactivate();
            X('stream').module('overdrive').deactivate();
            X('noise').module('overdrive').deactivate();

            X('mixer').module('distortion').deactivate();
            X('oneshot').module('distortion').deactivate();
            X('audio').module('distortion').deactivate();
            X('stream').module('distortion').deactivate();
            X('noise').module('distortion').deactivate();

            X('mixer').module('fuzz').deactivate();
            X('oneshot').module('fuzz').deactivate();
            X('audio').module('fuzz').deactivate();
            X('stream').module('fuzz').deactivate();
            X('noise').module('fuzz').deactivate();

            break;
          }

          case 'crunch':
          case 'natural':
          case 'warm': {
            X('mixer').module('overdrive').activate();
            X('oneshot').module('overdrive').activate();
            X('audio').module('overdrive').activate();
            X('stream').module('overdrive').activate();
            X('noise').module('overdrive').activate();

            X('mixer').module('booster').deactivate();
            X('oneshot').module('booster').deactivate();
            X('audio').module('booster').deactivate();
            X('stream').module('booster').deactivate();
            X('noise').module('booster').deactivate();

            X('mixer').module('distortion').deactivate();
            X('oneshot').module('distortion').deactivate();
            X('audio').module('distortion').deactivate();
            X('stream').module('distortion').deactivate();
            X('noise').module('distortion').deactivate();

            X('mixer').module('fuzz').deactivate();
            X('oneshot').module('fuzz').deactivate();
            X('audio').module('fuzz').deactivate();
            X('stream').module('fuzz').deactivate();
            X('noise').module('fuzz').deactivate();

            break;
          }

          case 'distortion':
          case 'metal':
          case 'core': {
            X('mixer').module('distortion').activate();
            X('oneshot').module('distortion').activate();
            X('audio').module('distortion').activate();
            X('stream').module('distortion').activate();
            X('noise').module('distortion').activate();

            X('mixer').module('booster').deactivate();
            X('oneshot').module('booster').deactivate();
            X('audio').module('booster').deactivate();
            X('stream').module('booster').deactivate();
            X('noise').module('booster').deactivate();

            X('mixer').module('overdrive').deactivate();
            X('oneshot').module('overdrive').deactivate();
            X('audio').module('overdrive').deactivate();
            X('stream').module('overdrive').deactivate();
            X('noise').module('overdrive').deactivate();

            X('mixer').module('fuzz').deactivate();
            X('oneshot').module('fuzz').deactivate();
            X('audio').module('fuzz').deactivate();
            X('stream').module('fuzz').deactivate();
            X('noise').module('fuzz').deactivate();

            break;
          }

          case 'standard':
          case 'full-rectifier': {
            X('mixer').module('fuzz').activate();
            X('oneshot').module('fuzz').activate();
            X('audio').module('fuzz').activate();
            X('stream').module('fuzz').activate();
            X('noise').module('fuzz').activate();

            X('mixer').module('booster').deactivate();
            X('oneshot').module('booster').deactivate();
            X('audio').module('booster').deactivate();
            X('stream').module('booster').deactivate();
            X('noise').module('booster').deactivate();

            X('mixer').module('overdrive').deactivate();
            X('oneshot').module('overdrive').deactivate();
            X('audio').module('overdrive').deactivate();
            X('stream').module('overdrive').deactivate();
            X('noise').module('overdrive').deactivate();

            X('mixer').module('distortion').deactivate();
            X('oneshot').module('distortion').deactivate();
            X('audio').module('distortion').deactivate();
            X('stream').module('distortion').deactivate();
            X('noise').module('distortion').deactivate();

            break;
          }
        }
      } else {
        X('mixer').module('booster').deactivate();
        X('oneshot').module('booster').deactivate();
        X('audio').module('booster').deactivate();
        X('stream').module('booster').deactivate();
        X('noise').module('booster').deactivate();

        X('mixer').module('overdrive').deactivate();
        X('oneshot').module('overdrive').deactivate();
        X('audio').module('overdrive').deactivate();
        X('stream').module('overdrive').deactivate();
        X('noise').module('overdrive').deactivate();

        X('mixer').module('distortion').deactivate();
        X('oneshot').module('distortion').deactivate();
        X('audio').module('distortion').deactivate();
        X('stream').module('distortion').deactivate();
        X('noise').module('distortion').deactivate();

        X('mixer').module('fuzz').deactivate();
        X('oneshot').module('fuzz').deactivate();
        X('audio').module('fuzz').deactivate();
        X('stream').module('fuzz').deactivate();
        X('noise').module('fuzz').deactivate();
      }

      setBooster(checked);
    },
    [boosterType]
  );

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.currentTarget.value;

    switch (type) {
      case 'clean': {
        X('mixer').module('booster').activate();
        X('oneshot').module('booster').activate();
        X('audio').module('booster').activate();
        X('stream').module('booster').activate();
        X('noise').module('booster').activate();

        X('mixer').module('booster').param({ type });
        X('oneshot').module('booster').param({ type });
        X('audio').module('booster').param({ type });
        X('stream').module('booster').param({ type });
        X('noise').module('booster').param({ type });

        X('mixer').module('overdrive').deactivate();
        X('oneshot').module('overdrive').deactivate();
        X('audio').module('overdrive').deactivate();
        X('stream').module('overdrive').deactivate();
        X('noise').module('overdrive').deactivate();

        X('mixer').module('distortion').deactivate();
        X('oneshot').module('distortion').deactivate();
        X('audio').module('distortion').deactivate();
        X('stream').module('distortion').deactivate();
        X('noise').module('distortion').deactivate();

        X('mixer').module('fuzz').deactivate();
        X('oneshot').module('fuzz').deactivate();
        X('audio').module('fuzz').deactivate();
        X('stream').module('fuzz').deactivate();
        X('noise').module('fuzz').deactivate();

        setBoosterType(type);

        break;
      }

      case 'crunch':
      case 'natural':
      case 'warm': {
        X('mixer').module('overdrive').activate();
        X('oneshot').module('overdrive').activate();
        X('audio').module('overdrive').activate();
        X('stream').module('overdrive').activate();
        X('noise').module('overdrive').activate();

        X('mixer').module('overdrive').param({ type });
        X('oneshot').module('overdrive').param({ type });
        X('audio').module('overdrive').param({ type });
        X('stream').module('overdrive').param({ type });
        X('noise').module('overdrive').param({ type });

        X('mixer').module('booster').deactivate();
        X('oneshot').module('booster').deactivate();
        X('audio').module('booster').deactivate();
        X('stream').module('booster').deactivate();
        X('noise').module('booster').deactivate();

        X('mixer').module('distortion').deactivate();
        X('oneshot').module('distortion').deactivate();
        X('audio').module('distortion').deactivate();
        X('stream').module('distortion').deactivate();
        X('noise').module('distortion').deactivate();

        X('mixer').module('fuzz').deactivate();
        X('oneshot').module('fuzz').deactivate();
        X('audio').module('fuzz').deactivate();
        X('stream').module('fuzz').deactivate();
        X('noise').module('fuzz').deactivate();

        setBoosterType(type);

        break;
      }

      case 'distortion':
      case 'metal':
      case 'core': {
        X('mixer').module('distortion').activate();
        X('oneshot').module('distortion').activate();
        X('audio').module('distortion').activate();
        X('stream').module('distortion').activate();
        X('noise').module('distortion').activate();

        X('mixer').module('distortion').param({ type });
        X('oneshot').module('distortion').param({ type });
        X('audio').module('distortion').param({ type });
        X('stream').module('distortion').param({ type });
        X('noise').module('distortion').param({ type });

        X('mixer').module('booster').deactivate();
        X('oneshot').module('booster').deactivate();
        X('audio').module('booster').deactivate();
        X('stream').module('booster').deactivate();
        X('noise').module('booster').deactivate();

        X('mixer').module('overdrive').deactivate();
        X('oneshot').module('overdrive').deactivate();
        X('audio').module('overdrive').deactivate();
        X('stream').module('overdrive').deactivate();
        X('noise').module('overdrive').deactivate();

        X('mixer').module('fuzz').deactivate();
        X('oneshot').module('fuzz').deactivate();
        X('audio').module('fuzz').deactivate();
        X('stream').module('fuzz').deactivate();
        X('noise').module('fuzz').deactivate();

        switch (type) {
          case 'distortion': {
            X('mixer').module('distortion').param({ middle: 3 });
            X('oneshot').module('distortion').param({ middle: 3 });
            X('audio').module('distortion').param({ middle: 3 });
            X('stream').module('distortion').param({ middle: 3 });
            X('noise').module('distortion').param({ middle: 3 });

            break;
          }

          case 'metal': {
            X('mixer').module('distortion').param({ bass: -4, middle: 4, treble: -4 });
            X('oneshot').module('distortion').param({ bass: -4, middle: 4, treble: -4 });
            X('audio').module('distortion').param({ bass: -4, middle: 4, treble: -4 });
            X('stream').module('distortion').param({ bass: -4, middle: 4, treble: -4 });
            X('noise').module('distortion').param({ bass: -4, middle: 4, treble: -4 });

            break;
          }

          case 'core': {
            X('mixer').module('distortion').param({ bass: 8, middle: -12, treble: 4 });
            X('oneshot').module('distortion').param({ bass: 8, middle: -12, treble: 4 });
            X('audio').module('distortion').param({ bass: 8, middle: -12, treble: 4 });
            X('stream').module('distortion').param({ bass: 8, middle: -12, treble: 4 });
            X('noise').module('distortion').param({ bass: 8, middle: -12, treble: 4 });

            break;
          }
        }

        setBoosterType(type);

        break;
      }

      case 'standard':
      case 'full-rectifier': {
        X('mixer').module('fuzz').activate();
        X('oneshot').module('fuzz').activate();
        X('audio').module('fuzz').activate();
        X('stream').module('fuzz').activate();
        X('noise').module('fuzz').activate();

        X('mixer').module('fuzz').param({ type });
        X('oneshot').module('fuzz').param({ type });
        X('audio').module('fuzz').param({ type });
        X('stream').module('fuzz').param({ type });
        X('noise').module('fuzz').param({ type });

        X('mixer').module('booster').deactivate();
        X('oneshot').module('booster').deactivate();
        X('audio').module('booster').deactivate();
        X('stream').module('booster').deactivate();
        X('noise').module('booster').deactivate();

        X('mixer').module('overdrive').deactivate();
        X('oneshot').module('overdrive').deactivate();
        X('audio').module('overdrive').deactivate();
        X('stream').module('overdrive').deactivate();
        X('noise').module('overdrive').deactivate();

        X('mixer').module('distortion').deactivate();
        X('oneshot').module('distortion').deactivate();
        X('audio').module('distortion').deactivate();
        X('stream').module('distortion').deactivate();
        X('noise').module('distortion').deactivate();

        setBoosterType(type);

        break;
      }
    }
  }, []);

  const onChangeDriveCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const drive = event.currentTarget.valueAsNumber;

    X('mixer').module('booster').param({ drive });
    X('oneshot').module('booster').param({ drive });
    X('audio').module('booster').param({ drive });
    X('stream').module('booster').param({ drive });
    X('noise').module('booster').param({ drive });

    X('mixer').module('overdrive').param({ drive });
    X('oneshot').module('overdrive').param({ drive });
    X('audio').module('overdrive').param({ drive });
    X('stream').module('overdrive').param({ drive });
    X('noise').module('overdrive').param({ drive });

    X('mixer').module('distortion').param({ drive });
    X('oneshot').module('distortion').param({ drive });
    X('audio').module('distortion').param({ drive });
    X('stream').module('distortion').param({ drive });
    X('noise').module('distortion').param({ drive });

    X('mixer').module('fuzz').param({ drive });
    X('oneshot').module('fuzz').param({ drive });
    X('audio').module('fuzz').param({ drive });
    X('stream').module('fuzz').param({ drive });
    X('noise').module('fuzz').param({ drive });
  }, []);

  const onChangeLevelCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const level = event.currentTarget.valueAsNumber;

    X('mixer').module('booster').param({ level });
    X('oneshot').module('booster').param({ level });
    X('audio').module('booster').param({ level });
    X('stream').module('booster').param({ level });
    X('noise').module('booster').param({ level });

    X('mixer').module('overdrive').param({ level });
    X('oneshot').module('overdrive').param({ level });
    X('audio').module('overdrive').param({ level });
    X('stream').module('overdrive').param({ level });
    X('noise').module('overdrive').param({ level });

    X('mixer').module('distortion').param({ level });
    X('oneshot').module('distortion').param({ level });
    X('audio').module('distortion').param({ level });
    X('stream').module('distortion').param({ level });
    X('noise').module('distortion').param({ level });

    X('mixer').module('fuzz').param({ level });
    X('oneshot').module('fuzz').param({ level });
    X('audio').module('fuzz').param({ level });
    X('stream').module('fuzz').param({ level });
    X('noise').module('fuzz').param({ level });
  }, []);

  return (
    <div className='BoosterFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='OD/DS' checked={booster} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <Select
          label='Select OD/DS'
          values={['clean', 'crunch', 'natural', 'warm', 'standard', 'distortion', 'metal', 'core', 'full-rectifier']}
          texts={['clean booster', 'crunch', 'natural overdrive', 'warm overdrive', 'distortion', 'metal', 'core', 'fuzz', 'hard fuzz']}
          defaultValue='clean'
          disabled={false}
          textTransform={true}
          onChange={onChangeTypeCallback}
        />
        <ParameterController label='Drive' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeDriveCallback} />
        <ParameterController label='Level' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeLevelCallback} />
      </Fieldset>
    </div>
  );
};
