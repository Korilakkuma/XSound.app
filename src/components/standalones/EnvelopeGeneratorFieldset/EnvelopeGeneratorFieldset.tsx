import type React from 'react';
import { useCallback } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const EnvelopeGeneratorFieldset: React.FC = () => {
  const onChangeAttackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attack = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ attack });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ attack });
    X('oneshot').module('envelopegenerator').param({ attack });
    X('noise').module('envelopegenerator').param({ attack });
  }, []);

  const onChangeDecayCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const decay = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ decay });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ decay });
    X('oneshot').module('envelopegenerator').param({ decay });
    X('noise').module('envelopegenerator').param({ decay });
  }, []);

  const onChangeSustainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const sustain = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ sustain });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ sustain });
    X('oneshot').module('envelopegenerator').param({ sustain });
    X('noise').module('envelopegenerator').param({ sustain });
  }, []);

  const onChangeReleaseCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const release = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ release });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ release });
    X('oneshot').module('envelopegenerator').param({ release });
    X('noise').module('envelopegenerator').param({ release });
  }, []);

  return (
    <div className='EnvelopeGeneratorFieldset'>
      <Fieldset>
        <Legend>Envelope Generator</Legend>
        <ParameterController label='Attack' autoupdate={false} defaultValue={0.01} min={0} max={1} step={0.01} onChange={onChangeAttackCallback} />
        <ParameterController label='Decay' autoupdate={false} defaultValue={0.3} min={0} max={1} step={0.01} onChange={onChangeDecayCallback} />
        <ParameterController label='Sustain' autoupdate={false} defaultValue={0.5} min={0} max={1} step={0.01} onChange={onChangeSustainCallback} />
        <ParameterController label='Release' autoupdate={false} defaultValue={1} min={0} max={1} step={0.01} onChange={onChangeReleaseCallback} />
      </Fieldset>
    </div>
  );
};
