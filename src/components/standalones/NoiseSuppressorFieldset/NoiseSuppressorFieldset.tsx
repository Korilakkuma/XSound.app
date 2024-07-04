import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const NoiseSuppressorFieldset: React.FC = () => {
  const [noisesuppressor, setNoisesuppressor] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('noisesuppressor').activate();
      X('oneshot').module('noisesuppressor').activate();
      X('audio').module('noisesuppressor').activate();
      X('stream').module('noisesuppressor').activate();
      X('noise').module('noisesuppressor').activate();
    } else {
      X('mixer').module('noisesuppressor').deactivate();
      X('oneshot').module('noisesuppressor').deactivate();
      X('audio').module('noisesuppressor').deactivate();
      X('stream').module('noisesuppressor').deactivate();
      X('noise').module('noisesuppressor').deactivate();
    }

    setNoisesuppressor(checked);
  }, []);

  const onChangeThresholdCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const threshold = event.currentTarget.valueAsNumber;

    X('mixer').module('noisesuppressor').param({ threshold });
    X('oneshot').module('noisesuppressor').param({ threshold });
    X('audio').module('noisesuppressor').param({ threshold });
    X('stream').module('noisesuppressor').param({ threshold });
    X('noise').module('noisesuppressor').param({ threshold });
  }, []);

  return (
    <div className='NoiseSuppressorFieldset'>
      <Fieldset>
        <Legend>
          <Switch label='Noise Sup.' checked={noisesuppressor} labelAsText={false} onChange={onChangeStateCallback} />
        </Legend>
        <ParameterController label='Threshold' autoupdate={false} defaultValue={0} min={0} max={1} step={0.005} onChange={onChangeThresholdCallback} />
      </Fieldset>
    </div>
  );
};
