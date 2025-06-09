import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Select } from '/src/components/atoms/Select';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

type BoosterType = 'bitcrusher' | 'overdrive' | 'fuzz';

export const BoosterFieldset: React.FC = () => {
  const [booster, setBooster] = useState<boolean>(false);
  const [boosterType, setBoosterType] = useState<BoosterType>('overdrive');

  const onChangeStateCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.currentTarget.checked;

      if (checked) {
        switch (boosterType) {
          case 'bitcrusher': {
            X('mixer').module('bitcrusher').activate();
            X('oneshot').module('bitcrusher').activate();
            X('audio').module('bitcrusher').activate();
            X('stream').module('bitcrusher').activate();
            X('noise').module('bitcrusher').activate();

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

          case 'overdrive': {
            X('mixer').module('overdrive').activate();
            X('oneshot').module('overdrive').activate();
            X('audio').module('overdrive').activate();
            X('stream').module('overdrive').activate();
            X('noise').module('overdrive').activate();

            X('mixer').module('bitcrusher').deactivate();
            X('oneshot').module('bitcrusher').deactivate();
            X('audio').module('bitcrusher').deactivate();
            X('stream').module('bitcrusher').deactivate();
            X('noise').module('bitcrusher').deactivate();

            X('mixer').module('fuzz').deactivate();
            X('oneshot').module('fuzz').deactivate();
            X('audio').module('fuzz').deactivate();
            X('stream').module('fuzz').deactivate();
            X('noise').module('fuzz').deactivate();

            break;
          }

          case 'fuzz': {
            X('mixer').module('fuzz').activate();
            X('oneshot').module('fuzz').activate();
            X('audio').module('fuzz').activate();
            X('stream').module('fuzz').activate();
            X('noise').module('fuzz').activate();

            X('mixer').module('bitcrusher').deactivate();
            X('oneshot').module('bitcrusher').deactivate();
            X('audio').module('bitcrusher').deactivate();
            X('stream').module('bitcrusher').deactivate();
            X('noise').module('bitcrusher').deactivate();

            X('mixer').module('overdrive').deactivate();
            X('oneshot').module('overdrive').deactivate();
            X('audio').module('overdrive').deactivate();
            X('stream').module('overdrive').deactivate();
            X('noise').module('overdrive').deactivate();
            break;
          }
        }
      } else {
        X('mixer').module('bitcrusher').deactivate();
        X('oneshot').module('bitcrusher').deactivate();
        X('audio').module('bitcrusher').deactivate();
        X('stream').module('bitcrusher').deactivate();
        X('noise').module('bitcrusher').deactivate();

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
      }

      setBooster(checked);
    },
    [boosterType]
  );

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.currentTarget.value;

    switch (type) {
      case 'bitcrusher': {
        X('mixer').module('bitcrusher').activate();
        X('oneshot').module('bitcrusher').activate();
        X('audio').module('bitcrusher').activate();
        X('stream').module('bitcrusher').activate();
        X('noise').module('bitcrusher').activate();

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

        setBoosterType(type);

        break;
      }

      case 'overdrive': {
        X('mixer').module('overdrive').activate();
        X('oneshot').module('overdrive').activate();
        X('audio').module('overdrive').activate();
        X('stream').module('overdrive').activate();
        X('noise').module('overdrive').activate();

        X('mixer').module('bitcrusher').deactivate();
        X('oneshot').module('bitcrusher').deactivate();
        X('audio').module('bitcrusher').deactivate();
        X('stream').module('bitcrusher').deactivate();
        X('noise').module('bitcrusher').deactivate();

        X('mixer').module('fuzz').deactivate();
        X('oneshot').module('fuzz').deactivate();
        X('audio').module('fuzz').deactivate();
        X('stream').module('fuzz').deactivate();
        X('noise').module('fuzz').deactivate();

        setBoosterType(type);

        break;
      }

      case 'fuzz': {
        X('mixer').module('fuzz').activate();
        X('oneshot').module('fuzz').activate();
        X('audio').module('fuzz').activate();
        X('stream').module('fuzz').activate();
        X('noise').module('fuzz').activate();

        X('mixer').module('bitcrusher').deactivate();
        X('oneshot').module('bitcrusher').deactivate();
        X('audio').module('bitcrusher').deactivate();
        X('stream').module('bitcrusher').deactivate();
        X('noise').module('bitcrusher').deactivate();

        X('mixer').module('overdrive').deactivate();
        X('oneshot').module('overdrive').deactivate();
        X('audio').module('overdrive').deactivate();
        X('stream').module('overdrive').deactivate();
        X('noise').module('overdrive').deactivate();

        setBoosterType(type);

        break;
      }
    }
  }, []);

  const onChangeDriveCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const drive = event.currentTarget.valueAsNumber;

    X('mixer').module('overdrive').param({ drive });
    X('oneshot').module('overdrive').param({ drive });
    X('audio').module('overdrive').param({ drive });
    X('stream').module('overdrive').param({ drive });
    X('noise').module('overdrive').param({ drive });

    X('mixer').module('fuzz').param({ drive });
    X('oneshot').module('fuzz').param({ drive });
    X('audio').module('fuzz').param({ drive });
    X('stream').module('fuzz').param({ drive });
    X('noise').module('fuzz').param({ drive });
  }, []);

  const onChangeLevelCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const level = event.currentTarget.valueAsNumber;

    X('mixer').module('overdrive').param({ level });
    X('oneshot').module('overdrive').param({ level });
    X('audio').module('overdrive').param({ level });
    X('stream').module('overdrive').param({ level });
    X('noise').module('overdrive').param({ level });

    X('mixer').module('fuzz').param({ level });
    X('oneshot').module('fuzz').param({ level });
    X('audio').module('fuzz').param({ level });
    X('stream').module('fuzz').param({ level });
    X('noise').module('fuzz').param({ level });
  }, []);

  const onChangeBitsCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const bits = event.currentTarget.valueAsNumber;

    X('mixer').module('bitcrusher').param({ bits });
    X('oneshot').module('bitcrusher').param({ bits });
    X('audio').module('bitcrusher').param({ bits });
    X('stream').module('bitcrusher').param({ bits });
    X('noise').module('bitcrusher').param({ bits });
  }, []);

  return (
    <div className='BoosterFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='OD/DS' checked={booster} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <Select
          label='Select OD/DS'
          values={['bitcrusher', 'overdrive', 'fuzz']}
          texts={['bit crusher', 'overdrive', 'fuzz']}
          defaultValue='overdrive'
          disabled={false}
          onChange={onChangeTypeCallback}
        />
        {boosterType === 'bitcrusher' ? (
          <ParameterController label='Bits' autoupdate={false} defaultValue={1} min={1} max={4} step={0.01} onChange={onChangeBitsCallback} />
        ) : (
          <>
            <ParameterController label='Drive' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeDriveCallback} />
            <ParameterController label='Level' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeLevelCallback} />
          </>
        )}
      </Fieldset>
    </div>
  );
};
