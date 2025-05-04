import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'xsound';

import { NUMBER_OF_ONESHOTS, CONSTRAINTS } from '/src/config';
import { getStorage } from '/src/utils';
import { activateMIDIKeyboards, deactivateMIDIKeyboards, changeCurrentSoundSource } from '/src/slices';
import { Modal } from '/src/components/atoms/Modal';
import { Select } from '/src/components/atoms/Select';
import { ParameterController } from '/src/components/helpers/ParameterController';

import type { RootState } from '/src/store';
import type { SoundSource } from '/src/types';

export type Props = {
  currentSoundSource: SoundSource;
};

const MIN_NOTE_NUMBER = 21;
const MAX_NOTE_NUMBER = 108;
const MAX_VELOCITY = 127;

export const SoundSourceFieldset: React.FC<Props> = ({ currentSoundSource }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShowModalForMIDIError, setIsShowModalForMIDIError] = useState<boolean>(false);

  const [inputDeviceIds, setInputDeviceIds] = useState<string[]>(['default']);
  const [inputDeviceLabels, setInputDeviceLabels] = useState<string[]>(['Input Device']);
  const [outputDeviceIds, setOutputDeviceIds] = useState<string[]>(['default']);
  const [outputDeviceLabels, setOutputDeviceLabels] = useState<string[]>(['Output Device']);

  const dispatch = useDispatch();

  const activeMIDIKeyboardIndexes = useSelector((state: RootState) => state.activeMIDIKeyboardIndexes);

  const storage = useMemo(() => {
    return getStorage();
  }, []);

  const overrideConstraints: MediaStreamConstraints = useMemo(() => {
    return storage.constraints ?? {};
  }, [storage]);

  const midiSource = useMemo(() => {
    switch (currentSoundSource) {
      case 'oscillator':
        return 'oscillator';
      case 'piano':
        return 'oneshot';
      case 'guitar':
        return 'oneshot';
      case 'electric-guitar':
        return 'oneshot';
      case 'orgel':
        return 'oneshot';
      default:
        return 'noise';
    }
  }, [currentSoundSource]);

  const offset = useMemo(() => {
    switch (currentSoundSource) {
      case 'oscillator':
        return 0;
      case 'piano':
        return 0;
      case 'guitar':
        return NUMBER_OF_ONESHOTS;
      case 'electric-guitar':
        return NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS;
      case 'orgel':
        return NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS;
      default:
        return 0;
    }
  }, [currentSoundSource]);

  const onChangeMasterVolumeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mastervolume = event.currentTarget.valueAsNumber;

    X('mixer').param({ mastervolume });
    X('oneshot').param({ mastervolume });
    X('audio').param({ mastervolume });
    X('stream').param({ mastervolume });
    X('noise').param({ mastervolume });
  }, []);

  const noteOn = useCallback(
    (noteNumber: number, velocity: number) => {
      if (noteNumber < MIN_NOTE_NUMBER || noteNumber > MAX_NOTE_NUMBER) {
        return;
      }

      if (velocity < 0 || velocity > MAX_VELOCITY) {
        return;
      }

      const targetIndex = noteNumber - MIN_NOTE_NUMBER;
      const volume = velocity / MAX_VELOCITY;

      /** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Non_configurable_array_element */
      const newActiveIndexes = [...activeMIDIKeyboardIndexes];

      newActiveIndexes.push(targetIndex);

      if (midiSource === 'noise') {
        X('noise').start();

        X('noise').module('recorder').start();
      } else if (midiSource === 'oscillator') {
        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          if (i !== 0) {
            X('oscillator').get(i).activate();
            window.clonedXSound('oscillator').get(i).activate();
          }

          X('oscillator').get(i).param({ volume });
          window.clonedXSound('oscillator').get(i).param({ volume });
        }

        X('oscillator').ready(0, 0).start(X.toFrequencies(newActiveIndexes));
        window.clonedXSound('oscillator').ready(0, 0).start(X.toFrequencies(newActiveIndexes));

        X('mixer').start([X('oscillator'), window.clonedXSound('oscillator')], [volume, volume]);

        X('mixer').module('recorder').start();
      } else {
        X('oneshot')
          .reset(targetIndex, 'volume', volume)
          .ready(0, 0)
          .start(newActiveIndexes.map((index: number) => index + offset));

        X('oneshot').module('recorder').start();
      }

      dispatch(activateMIDIKeyboards(newActiveIndexes));
    },
    [dispatch, midiSource, activeMIDIKeyboardIndexes, offset]
  );

  const noteOff = useCallback(
    (noteNumber: number, velocity: number) => {
      if (noteNumber < MIN_NOTE_NUMBER || noteNumber > MAX_NOTE_NUMBER) {
        return;
      }

      if (velocity < 0 || velocity > MAX_VELOCITY) {
        return;
      }

      const targetIndex = noteNumber - MIN_NOTE_NUMBER;

      /** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Non_configurable_array_element */
      const newActiveIndexes = [...activeMIDIKeyboardIndexes];

      const index = newActiveIndexes.indexOf(targetIndex);

      if (index !== -1) {
        newActiveIndexes.splice(index, 1);
      }

      if (midiSource === 'noise') {
        X('noise').stop();

        X('noise').module('recorder').start();
      } else if (midiSource === 'oscillator') {
        X('oscillator').stop();
        window.clonedXSound('oscillator').stop();

        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          if (i !== 0) {
            X('oscillator').get(i).deactivate();
            window.clonedXSound('oscillator').get(i).deactivate();
          }
        }
      } else {
        X('oneshot')
          .stop(newActiveIndexes.map((index: number) => index + offset))
          .reset(targetIndex, 'volume', 1);
      }

      dispatch(deactivateMIDIKeyboards(targetIndex));
    },
    [dispatch, midiSource, activeMIDIKeyboardIndexes, offset]
  );

  const successCallback = useCallback(
    (midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]) => {
      if (inputs[0]) {
        inputs[0].onmidimessage = (event: MIDIMessageEvent) => {
          if (event.data === null) {
            return;
          }

          switch (event.data[0] & 0xf0) {
            case 0x90:
              noteOn(event.data[1], event.data[2]);
              break;
            case 0x80:
              noteOff(event.data[1], event.data[2]);
              break;
            default:
              break;
          }
        };
      }

      if (outputs.length > 0) {
        // TODO: do something ...
      }
    },
    [noteOn, noteOff]
  );

  const onChangeSoundSourceCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      X('mixer').module('analyser').stop('time').domain('time').clear();
      X('mixer').module('analyser').stop('fft').domain('fft').clear();
      X('oneshot').module('analyser').stop('time').domain('time').clear();
      X('oneshot').module('analyser').stop('fft').domain('fft').clear();
      X('audio').module('analyser').stop('time').domain('time').clear();
      X('audio').module('analyser').stop('fft').domain('fft').clear();
      X('stream').module('analyser').stop('time').domain('time').clear();
      X('stream').module('analyser').stop('fft').domain('fft').clear();

      const source = event.currentTarget.value;

      switch (source) {
        case 'oscillator':
        case 'piano':
        case 'guitar':
        case 'electric-guitar':
        case 'orgel':
        case 'whitenoise':
        case 'pinknoise':
        case 'browniannoise':
        case 'stream':
        case 'midi':
          break;
        default:
          return;
      }

      if (!source.endsWith('noise')) {
        X('noise').module('analyser').stop('time').domain('time').clear();
        X('noise').module('analyser').stop('fft').domain('fft').clear();
      }

      dispatch(changeCurrentSoundSource(source));

      X('stream').clear();

      switch (source) {
        case 'stream': {
          X('stream')
            .setup({ ...CONSTRAINTS, ...overrideConstraints })
            .ready()
            .then(() => {
              X('stream').start();
            })
            .catch((error: Error) => {
              // eslint-disable-next-line no-console
              console.error(error);
            });

          break;
        }

        case 'midi': {
          X('midi').setup({
            options: {
              sysex: true
            },
            successCallback: (midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]) => {
              successCallback(midiAccess, inputs, outputs);
            },
            errorCallback: () => {
              setErrorMessage('Cannot use Web MIDI API.');
              setIsShowModalForMIDIError(true);
            }
          });

          break;
        }

        default: {
          break;
        }
      }
    },
    [dispatch, successCallback, overrideConstraints]
  );

  const onChangeInputDeviceCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      X('stream').clearAudioDevices();

      const deviceId = event.currentTarget.value;

      const constraints: MediaStreamConstraints = {
        audio: {
          deviceId,
          ...CONSTRAINTS.audio
        },
        video: false,
        ...overrideConstraints
      };

      X('stream')
        .setup(constraints)
        .ready()
        .then(() => {
          X('stream').start();
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    },
    [overrideConstraints]
  );

  const onChangeOutputDeviceCallback = useCallback(() => {}, []);

  const onCloseModalCallback = useCallback(() => {
    setErrorMessage('');
    setIsShowModalForMIDIError(false);
  }, []);

  useEffect(() => {
    X('stream')
      .devices()
      .then((deviceInfos) => {
        if (!deviceInfos) {
          return;
        }

        const inputDevices = deviceInfos
          .filter((deviceInfo) => {
            return deviceInfo.kind === 'audioinput';
          })
          .map((device) => {
            const { label, groupId, deviceId } = device;

            return {
              label,
              groupId,
              deviceId
            };
          });

        const outputDevices = deviceInfos
          .filter((deviceInfo) => {
            return deviceInfo.kind === 'audiooutput';
          })
          .map((device) => {
            const { label, groupId, deviceId } = device;

            return {
              label,
              groupId,
              deviceId
            };
          });

        setInputDeviceIds(inputDevices.map((device) => device.deviceId));
        setInputDeviceLabels(inputDevices.map((device) => device.label));
        setOutputDeviceIds(outputDevices.map((device) => device.deviceId));
        setOutputDeviceLabels(outputDevices.map((device) => device.label));
      })
      .catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  return (
    <div className='SoundSourceFieldset'>
      <ParameterController label='Master Volume' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeMasterVolumeCallback} />
      <Select
        label='Select Sound Source'
        values={['oscillator', 'piano', 'guitar', 'electric-guitar', 'orgel', 'whitenoise', 'pinknoise', 'browniannoise', 'stream', 'midi']}
        texts={['oscillator', 'piano', 'A. guitar', 'E. guitar', 'orgel (music box)', 'white noise', 'pink noise', 'brownian noise', 'microphone', 'MIDI']}
        disabled={false}
        onChange={onChangeSoundSourceCallback}
      />
      <Select
        label='Select Input Device'
        values={inputDeviceIds}
        texts={inputDeviceLabels}
        disabled={currentSoundSource !== 'stream'}
        onChange={onChangeInputDeviceCallback}
      />
      <Select label='Select Output Device' values={outputDeviceIds} texts={outputDeviceLabels} disabled={false} onChange={onChangeOutputDeviceCallback} />
      <Modal isShow={isShowModalForMIDIError} title='Error' hasOverlay={true} asAlert={true} onClose={onCloseModalCallback}>
        {errorMessage}
      </Modal>
    </div>
  );
};
