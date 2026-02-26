import type React from 'react';
import { useCallback, useMemo, useState, useRef } from 'react';

import type { RecordType, QuantizationBit, WaveExportType } from 'xsound';

import { X } from 'xsound';

import { createFilename, getStorage } from '/src/utils';

import type { CustomizedParameters, SoundSource } from '/src/types';

import { Fieldset } from '/src/components/atoms/Fieldset';
import { Legend } from '/src/components/atoms/Legend';
import { Select } from '/src/components/atoms/Select';
import { ParameterController } from '/src/components/helpers/ParameterController';
import { SelectableModal } from '/src/components/helpers/SelectableModal';

export type Props = {
  currentSoundSource: SoundSource;
};

export const RecorderFieldset: React.FC<Props> = ({ currentSoundSource }) => {
  const [activeTrack, setActiveTrack] = useState<number>(0);
  const [objectURL, setObjectURL] = useState<string>('');
  const [running, setRunning] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [hasRecordedData, sethasRecordedData] = useState<boolean>(false);

  const svgChannel0Ref = useRef<SVGSVGElement | null>(null);
  const svgChannel1Ref = useRef<SVGSVGElement | null>(null);

  const storage: CustomizedParameters = useMemo(() => {
    return getStorage();
  }, []);

  const channel: RecordType = useMemo(() => {
    return storage.recorder?.channel || 2;
  }, [storage]);

  const bit: QuantizationBit = useMemo(() => {
    return storage.recorder?.bit || 16;
  }, [storage]);

  const type: WaveExportType = useMemo(() => {
    return storage.recorder?.type || 'blob';
  }, [storage]);

  const disabledDownload = useMemo(() => {
    return running || objectURL === '';
  }, [running, objectURL]);

  const render = useCallback((svg: SVGSVGElement, data: Blob, channelNumber: 0 | 1) => {
    const width = Number(svg.getAttribute('width') ?? '0');
    const height = Number(svg.getAttribute('height') ?? '0');

    const reader = new FileReader();

    reader.readAsArrayBuffer(data);

    reader.onload = async () => {
      const arraybuffer = reader.result;

      if (!(arraybuffer instanceof ArrayBuffer)) {
        return;
      }

      const context = X.get();

      X.decode(
        context,
        arraybuffer,
        (buffer: AudioBuffer) => {
          if (channelNumber === 0) {
            const source = new AudioBufferSourceNode(context, { buffer });

            source.connect(context.destination);
            source.start(context.currentTime);
          }

          const data = buffer.getChannelData(channelNumber);

          const path = document.getElementById(`svg-path-recorder-channel-${channelNumber}`);

          if (path === null) {
            return;
          }

          path.setAttribute('d', '');

          let d = '';

          for (let n = 0, len = data.length; n < len; n++) {
            if (n % 128 !== 0) {
              continue;
            }

            const x = (n / len) * width;
            const y = (1 - data[n]) * (height / 2);

            if (d === '') {
              d += `M${x} ${y}`;
            } else {
              d += ` L${x} ${y}`;
            }
          }

          path.setAttribute('d', d);
          path.setAttribute('stroke', 'rgb(0 0 255)');
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke-width', '2');
          path.setAttribute('stroke-linecap', 'round');
          path.setAttribute('stroke-linejoin', 'miter');
        },
        (error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      );
    };
  }, []);

  const onClickRecordButtonCallback = useCallback(() => {
    if (
      X('mixer').module('recorder').get() !== -1 ||
      X('oneshot').module('recorder').get() !== -1 ||
      X('audio').module('recorder').get() !== -1 ||
      X('noise').module('recorder').get() !== -1
    ) {
      X('mixer').module('recorder').stop();
      X('oneshot').module('recorder').stop();
      X('audio').module('recorder').stop();
      X('noise').module('recorder').stop();

      setRunning(false);
    } else {
      X('mixer').module('recorder').ready(activeTrack);
      X('oneshot').module('recorder').ready(activeTrack);
      X('audio').module('recorder').ready(activeTrack);
      X('noise').module('recorder').ready(activeTrack);

      setRunning(true);
    }

    if (currentSoundSource === 'stream') {
      if (X('stream').module('recorder').get() !== -1) {
        X('stream').module('recorder').stop();

        setRunning(false);
      } else {
        X('stream').module('recorder').ready(activeTrack);
        X('stream').start();
        X('stream').module('recorder').start();

        setRunning(true);
      }
    }

    sethasRecordedData(
      X('mixer').module('recorder').has(-1, -1) ||
        X('oneshot').module('recorder').has(-1, -1) ||
        X('audio').module('recorder').has(-1, -1) ||
        X('stream').module('recorder').has(-1, -1) ||
        X('noise').module('recorder').has(-1, -1)
    );
  }, [currentSoundSource, activeTrack]);

  const onClickCreateButtonCallback = useCallback(() => {
    setRunning(false);

    if (X('mixer').module('recorder').has(-1, -1)) {
      setCreating(true);

      const blob = X('mixer').module('recorder').create(-1, channel, bit, type);

      if (blob instanceof Blob) {
        if (svgChannel0Ref.current) {
          render(svgChannel0Ref.current, blob, 0);
        }

        if (svgChannel1Ref.current) {
          render(svgChannel1Ref.current, blob, 1);
        }

        setObjectURL(window.URL.createObjectURL(blob));
      }

      setCreating(false);
    }

    if (X('oneshot').module('recorder').has(-1, -1)) {
      setCreating(true);

      const blob = X('oneshot').module('recorder').create(-1, channel, bit, type);

      if (blob instanceof Blob) {
        if (svgChannel0Ref.current) {
          render(svgChannel0Ref.current, blob, 0);
        }

        if (svgChannel1Ref.current) {
          render(svgChannel1Ref.current, blob, 1);
        }

        setObjectURL(window.URL.createObjectURL(blob));
      }

      setCreating(false);
    }

    if (X('audio').module('recorder').has(-1, -1)) {
      setCreating(true);

      const blob = X('audio').module('recorder').create(-1, channel, bit, type);

      if (blob instanceof Blob) {
        if (svgChannel0Ref.current) {
          render(svgChannel0Ref.current, blob, 0);
        }

        if (svgChannel1Ref.current) {
          render(svgChannel1Ref.current, blob, 1);
        }

        setObjectURL(window.URL.createObjectURL(blob));
      }

      setCreating(false);
    }

    if (X('stream').module('recorder').has(-1, -1)) {
      setCreating(true);

      const blob = X('stream').module('recorder').create(-1, channel, bit, type);

      if (blob instanceof Blob) {
        if (svgChannel0Ref.current) {
          render(svgChannel0Ref.current, blob, 0);
        }

        if (svgChannel1Ref.current) {
          render(svgChannel1Ref.current, blob, 1);
        }

        setObjectURL(window.URL.createObjectURL(blob));
      }

      setCreating(false);
    }

    if (X('noise').module('recorder').has(-1, -1)) {
      setCreating(true);

      const blob = X('noise').module('recorder').create(-1, channel, bit, type);

      if (blob instanceof Blob) {
        if (svgChannel0Ref.current) {
          render(svgChannel0Ref.current, blob, 0);
        }

        if (svgChannel1Ref.current) {
          render(svgChannel1Ref.current, blob, 1);
        }

        setObjectURL(window.URL.createObjectURL(blob));
      }

      setCreating(false);
    }
  }, [channel, bit, type, render]);

  const onClickDownloadButtonCallback = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!objectURL || running) {
        // In the case of recording
        event.preventDefault();
      }
    },
    [objectURL, running]
  );

  const onClickClearButtonCallback = useCallback(() => {
    if (running) {
      // In the case of recording
      return;
    }

    setIsShowModal(true);
  }, [running]);

  const onClickClearTrackCallback = useCallback(() => {
    X('mixer').module('recorder').clear(activeTrack);
    X('oneshot').module('recorder').clear(activeTrack);
    X('audio').module('recorder').clear(activeTrack);
    X('stream').module('recorder').clear(activeTrack);
    X('noise').module('recorder').clear(activeTrack);

    sethasRecordedData(
      X('mixer').module('recorder').has(-1, -1) ||
        X('oneshot').module('recorder').has(-1, -1) ||
        X('audio').module('recorder').has(-1, -1) ||
        X('stream').module('recorder').has(-1, -1) ||
        X('noise').module('recorder').has(-1, -1)
    );

    setIsShowModal(false);

    const path0 = document.getElementById('svg-path-recorder-channel-0')!;
    const path1 = document.getElementById('svg-path-recorder-channel-1')!;

    path0.setAttribute('d', 'M0 24 L240 24');
    path1.setAttribute('d', 'M0 24 L240 24');
  }, [activeTrack]);

  const onClickCancelClearTrackCallback = useCallback(() => {
    setIsShowModal(false);
  }, []);

  const onChangeTrackCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (running) {
        // In the case of recording
        return;
      }

      const nextActiveTrack = Number(event.currentTarget.value);

      X('stream').stop();
      X('stream').module('recorder').stop();

      setActiveTrack(nextActiveTrack);
    },
    [running]
  );

  const onChangeLeftChannelGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('mixer').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('oneshot').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('audio').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('stream').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('noise').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
  }, []);

  const onChangeRightChannelGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('mixer').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('oneshot').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('audio').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('stream').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('noise').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
  }, []);

  return (
    <div className='RecorderFieldset'>
      <Fieldset>
        <Legend>Recorder</Legend>
        <Select
          label='Select Track'
          values={['0', '1', '2', '3']}
          texts={['track 1', 'track 2', 'track 3', 'track 4']}
          disabled={running}
          onChange={onChangeTrackCallback}
        />
        <ParameterController label='Left Channel' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeLeftChannelGainCallback} />
        <ParameterController
          label='Right Channel'
          autoupdate={false}
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeRightChannelGainCallback}
        />
        <div className='RecorderFieldset__buttons'>
          <button
            type='button'
            aria-label={running ? 'Stop Recording' : 'Start Recording'}
            className={`RecorderFieldset__controller${running ? ' -active' : ''}`}
            onClick={onClickRecordButtonCallback}
          />
          <button
            type='button'
            disabled={running || !hasRecordedData}
            aria-label={creating ? 'Now creating WAVE file' : 'Create WAVE file'}
            className={`RecorderFieldset__creator${creating ? ' -active' : ''}`}
            onClick={onClickCreateButtonCallback}
          />
          {disabledDownload ? (
            <button type='button' disabled={true} className='RecorderFieldset__download'>
              There is not recorded WAVE file
            </button>
          ) : (
            <a href={objectURL} download={createFilename('record-', 'wav')} className='RecorderFieldset__download' onClick={onClickDownloadButtonCallback}>
              Download
            </a>
          )}
          <button type='button' disabled={running} aria-label='Clear Track' className='RecorderFieldset__clear' onClick={onClickClearButtonCallback} />
        </div>
        <div className='RecorderFieldset__svg'>
          <svg ref={svgChannel0Ref} width={240} height={50}>
            <path id='svg-path-recorder-channel-0' d='M0 24 L240 24' stroke='rgb(0 0 255)' />
          </svg>
          <svg ref={svgChannel1Ref} width={240} height={50}>
            <path id='svg-path-recorder-channel-1' d='M0 24 L240 24' stroke='rgb(0 0 255)' />
          </svg>
        </div>
      </Fieldset>
      <SelectableModal
        hasOverlay={true}
        isShow={isShowModal}
        title='Confirmation'
        first={{
          label: 'Cancel',
          action: onClickCancelClearTrackCallback
        }}
        second={{
          label: 'OK',
          action: onClickClearTrackCallback
        }}
        onClose={onClickCancelClearTrackCallback}
      >
        <p>Clear Track {activeTrack + 1}. OK ?</p>
      </SelectableModal>
    </div>
  );
};
