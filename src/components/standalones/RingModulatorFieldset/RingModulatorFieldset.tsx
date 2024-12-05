import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const RingModulatorFieldset: React.FC = () => {
  const [ringmodulator, setRingmodulator] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('ringmodulator').activate();
      X('oneshot').module('ringmodulator').activate();
      X('audio').module('ringmodulator').activate();
      X('stream').module('ringmodulator').activate();
      X('noise').module('ringmodulator').activate();
    } else {
      X('mixer').module('ringmodulator').deactivate();
      X('oneshot').module('ringmodulator').deactivate();
      X('audio').module('ringmodulator').deactivate();
      X('stream').module('ringmodulator').deactivate();
      X('noise').module('ringmodulator').deactivate();
    }

    setRingmodulator(checked);
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('ringmodulator').param({ depth });
    X('oneshot').module('ringmodulator').param({ depth });
    X('audio').module('ringmodulator').param({ depth });
    X('stream').module('ringmodulator').param({ depth });
    X('noise').module('ringmodulator').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('ringmodulator').param({ rate });
    X('oneshot').module('ringmodulator').param({ rate });
    X('audio').module('ringmodulator').param({ rate });
    X('stream').module('ringmodulator').param({ rate });
    X('noise').module('ringmodulator').param({ rate });
  }, []);

  return (
    <div className='RingModulatorFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='Ring MOD.' checked={ringmodulator} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <ParameterController label='Depth' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeDepthCallback} />
        <ParameterController label='Rate' autoupdate={false} defaultValue={0} min={0} max={4000} step={100} onChange={onChangeRateCallback} />
      </Fieldset>
    </div>
  );
};
