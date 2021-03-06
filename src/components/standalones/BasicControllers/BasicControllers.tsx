import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  SoundSource,
  XSoundSource,
  MIDIAccess,
  MIDIInput,
  MIDIOutput,
  MIDIMessageEvent
} from '../../../types';
import {
  changeCurrentSoundSource,
  changeAnalyserState,
  changeMMLState
} from '../../../actions';
import { Switch } from '../../atoms/Switch';
import { Select } from '../../atoms/Select';
import { Modal } from '../../atoms/Modal';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

const MIN_NOTE_NUMBER = 21;
const MAX_NOTE_NUMBER = 108;
const MAX_VELOCITY    = 127;

export const BasicControllers: React.FC<Props> = (props: Props) => {
  const [analyserState, setAnalyserState] = useState<boolean>(false);
  const [mmlState, setMMLState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShowModalForMIDIError, setIsShowModalForMIDIError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const successCallback = useCallback((source: SoundSource, midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]) => {
    const indexes: number[] = [];
    const volumes: number[] = [];

    const noteOn = (noteNumber: number, velocity: number) => {
      if ((noteNumber < MIN_NOTE_NUMBER) || (noteNumber > MAX_NOTE_NUMBER)) {
        return;
      }

      if ((velocity < 0) || (velocity > MAX_VELOCITY)) {
        return;
      }

      const targetIndex = noteNumber - MIN_NOTE_NUMBER;
      const volume      = velocity / MAX_VELOCITY;

      if (source === 'oscillator') {
        indexes.push(targetIndex);

        volumes[0] = X('oscillator', 0).param('volume') as number;
        volumes[1] = window.C('oscillator', 0).param('volume') as number;

        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          if (i !== 0) {
            X('oscillator').get(i).state(true);
            window.C('oscillator').get(i).state(true);
          }

          X('oscillator').get(i).param('volume', volume);
          window.C('oscillator').get(i).param('volume', volume);
        }

        X('oscillator').ready(0, 0).start(X.toFrequencies(indexes));
        window.C('oscillator').ready(0, 0).start(X.toFrequencies(indexes));

        X('mixer').mix([X('oscillator'), window.C('oscillator')]);

        X('mixer').module('recorder').start();
        X('mixer').module('session').start();
      } else {
        X('oneshot').reset(targetIndex, 'volume', volume).ready(0, 0).start(targetIndex);

        X('oneshot').module('recorder').start();
        X('oneshot').module('session').start();
      }
    };

    const noteOff = (noteNumber: number, velocity: number) => {
      if ((noteNumber < MIN_NOTE_NUMBER) || (noteNumber > MAX_NOTE_NUMBER)) {
        return;
      }

      if ((velocity < 0) || (velocity > MAX_VELOCITY)) {
        return;
      }

      const targetIndex = noteNumber - MIN_NOTE_NUMBER;

      if (source === 'oscillator') {
        const index = indexes.indexOf(targetIndex);

        if (index !== -1) {
          indexes.splice(index, 1);
        }

        X('oscillator').stop();
        window.C('oscillator').stop();

        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          if (i !== 0) {
            X('oscillator').get(i).state(false);
            window.C('oscillator').get(i).state(false);
          }

          X('oscillator').get(i).param('volume', volumes[0]);
          window.C('oscillator').get(i).param('volume', volumes[1]);
        }
      } else {
        X('oneshot').stop(targetIndex).reset(targetIndex, 'volume', 1);
      }
    };

    if (inputs.length > 0) {
      inputs[0].onmidimessage = (event: MIDIMessageEvent) => {
        switch (event.data[0] & 0xf0) {
          case 0x90:
            noteOn(event.data[1], event.data[2]);
            break;
          case 0x80:
            noteOff(event.data[1], event.data[2]);
            break;
          default :
            break;
        }
      };
    }

    if (outputs.length > 0) {
      // TODO: do something ...
    }
  }, []);

  const onChangeMasterVolumeCallback = useCallback((event: React.SyntheticEvent) => {
    props.sources.forEach((source: XSoundSource) => {
      const mastervolume = (event.currentTarget as HTMLInputElement).valueAsNumber;

      if (X(source) !== null) {
        X(source).param('mastervolume', mastervolume);
      }

      if (window.C(source) !== null) {
        window.C(source).param('mastervolume', mastervolume);
      }
    });
  }, [props.sources]);

  const onChangeGlideCallback = useCallback((event: React.SyntheticEvent) => {
    const time = (event.currentTarget as HTMLInputElement).valueAsNumber;

    X('oscillator').module('glide').param('time', time);
    window.C('oscillator').module('glide').param('time', time);
  }, []);

  const onChangeTransposeCallback = useCallback((event: React.SyntheticEvent) => {
    X('oneshot').param('transpose', (((event.currentTarget as HTMLInputElement).valueAsNumber + 12) / 12));
  }, []);

  const onChangeSoundSourceCallback = useCallback((event: React.SyntheticEvent) => {
    props.sources.forEach((source: XSoundSource) => {
      X(source).module('analyser').stop('time').domain('time').clear();
      X(source).module('analyser').stop('fft').domain('fft').clear();
    });

    const source = (event.currentTarget as HTMLInputElement).value as SoundSource;

    dispatch(changeCurrentSoundSource(source));

    X('stream').clear();

    switch (source) {
      case 'stream':
        X('stream').ready()
          .then(() => {
            X('stream').start();
            X('stream').module('session').start();
          })
          .catch((error: Error) => {
            // eslint-disable-next-lint no-console
            console.error(error);
          });

        break;
      case 'midi':
        try {
          X('midi').setup(true, (midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]) => {
            successCallback(source, midiAccess, inputs, outputs);
          }, () => {
            setErrorMessage('Cannot use Web MIDI API.');
            setIsShowModalForMIDIError(true);
          });
        } catch (error) {
          setErrorMessage(error.message);
          setIsShowModalForMIDIError(true);
        }

        break;
      default:
        break;
    }
  }, [props.sources, dispatch, successCallback]);

  const onChangeAnalyserStateCallback = useCallback((event: React.SyntheticEvent) => {
    dispatch(changeAnalyserState((event.currentTarget as HTMLInputElement).checked));
    setAnalyserState(!analyserState);
  }, [dispatch, analyserState]);

  const onChangeMMLStateCallback = useCallback((event: React.SyntheticEvent) => {
    dispatch(changeMMLState((event.currentTarget as HTMLInputElement).checked));
    setMMLState(!mmlState);
  }, [dispatch, mmlState]);

  const onCloseModalCallback = useCallback(() => {
    setErrorMessage('');
    setIsShowModalForMIDIError(false);
  }, []);

  return (
    <div className="BasicControllers">
      <ValueController
        label="Master Volume"
        id="master-volume"
        defaultValue={1}
        min={0}
        max={1}
        step={0.05}
        width="20%"
        onChange={onChangeMasterVolumeCallback}
      />
      <ValueController
        label="Glide"
        id="glide"
        defaultValue={0}
        min={0}
        max={1}
        step={0.05}
        width="20%"
        onChange={onChangeGlideCallback}
      />
      <ValueController
        label="Transpose"
        id="transpose"
        defaultValue={0}
        min={-6}
        max={6}
        step={1}
        width="20%"
        onChange={onChangeTransposeCallback}
      />
      <Select
        id="select-sound-source"
        label="Select Sound Source"
        values={[
          'oscillator',
          'piano',
          'guitar',
          'electric-guitar',
          'whitenoise',
          'pinknoise',
          'browniannoise',
          'stream',
          'midi'
        ]}
        texts={[
          'OSCILLATOR',
          'PIANO',
          'A. GUITAR',
          'E. GUITAR',
          'WHITE NOISE',
          'PINK NOISE',
          'BROWNIAN NOISE',
          'MICROPHONE',
          'MIDI'
        ]}
        width="20%"
        onChange={onChangeSoundSourceCallback}
      />
      <Switch
        id="analyser"
        label="Analyser"
        checked={analyserState}
        onChange={onChangeAnalyserStateCallback}
      />
      <Switch
        id="mml"
        label="MML"
        checked={mmlState}
        onChange={onChangeMMLStateCallback}
      />
      <Modal
        hasOverlay
        isShow={isShowModalForMIDIError}
        title="Error"
        onClose={onCloseModalCallback}
      >
        {errorMessage}
      </Modal>
    </div>
  );
};
