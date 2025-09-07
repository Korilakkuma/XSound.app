import type React from 'react';
import { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { SVG } from '/src/components/atoms/SVG';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const EnvelopeGeneratorFieldset: React.FC = () => {
  const [attack, setAttack] = useState<number>(0.01);
  const [decay, setDecay] = useState<number>(0.3);
  const [sustain, setSustain] = useState<number>(0.5);
  const [release, setRelease] = useState<number>(1);

  const onChangeAttackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attack = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ attack });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ attack });
    X('oneshot').module('envelopegenerator').param({ attack });
    X('noise').module('envelopegenerator').param({ attack });

    setAttack(attack);
  }, []);

  const onChangeDecayCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const decay = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ decay });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ decay });
    X('oneshot').module('envelopegenerator').param({ decay });
    X('noise').module('envelopegenerator').param({ decay });

    setDecay(decay);
  }, []);

  const onChangeSustainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const sustain = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ sustain });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ sustain });
    X('oneshot').module('envelopegenerator').param({ sustain });
    X('noise').module('envelopegenerator').param({ sustain });

    setSustain(sustain);
  }, []);

  const onChangeReleaseCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const release = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ release });
    window.clonedXSound('oscillator').module('envelopegenerator').param({ release });
    X('oneshot').module('envelopegenerator').param({ release });
    X('noise').module('envelopegenerator').param({ release });

    setRelease(release);
  }, []);

  const setElementCallback = useCallback(
    (svg: SVGSVGElement) => {
      if (svg.firstElementChild) {
        svg.removeChild(svg.firstElementChild);
      }

      const width = Number(svg.getAttribute('width') ?? '0');
      const height = Number(svg.getAttribute('height') ?? '0');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      let d = `M0 ${height} L${attack * (width / 4)} 0`;

      const startDecay = attack * (width / 4);

      if (decay === 0) {
        d += ` L${startDecay} ${height - height * sustain}`;
      } else {
        d += ` L${startDecay + decay * (width / 4)} ${height - height * sustain}`;
      }

      const startRelease = (3 * width) / 4;

      d += ` L${startRelease} ${height - height * sustain}`;
      d += ` L${startRelease + release * (width / 4)} ${height} L${width} ${height}`;

      path.setAttribute('d', d);
      path.setAttribute('stroke', 'rgb(0 0 255)');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');

      svg.appendChild(path);
    },
    [attack, decay, sustain, release]
  );

  return (
    <div className='EnvelopeGeneratorFieldset'>
      <Fieldset>
        <Legend>Envelope Generator</Legend>
        <ParameterController label='Attack' autoupdate={false} defaultValue={0.01} min={0} max={1} step={0.01} onChange={onChangeAttackCallback} />
        <ParameterController label='Decay' autoupdate={false} defaultValue={0.3} min={0} max={1} step={0.01} onChange={onChangeDecayCallback} />
        <ParameterController label='Sustain' autoupdate={false} defaultValue={0.5} min={0} max={1} step={0.01} onChange={onChangeSustainCallback} />
        <ParameterController label='Release' autoupdate={false} defaultValue={1} min={0} max={1} step={0.01} onChange={onChangeReleaseCallback} />
      </Fieldset>
      <SVG width={280} height={100} hasHoverStyle={false} setElementCallback={setElementCallback} />
    </div>
  );
};
