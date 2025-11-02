import type { X, RecordType, QuantizationBit, WaveExportType, VocalCancelerAlgorithm } from 'xsound';

declare global {
  interface Window {
    globalXSound: typeof X;
    clonedXSound: ReturnType<typeof X.clone>;
  }
}

export type SoundSource = 'oscillator' | 'piano' | 'guitar' | 'electric-guitar' | 'orgel' | 'whitenoise' | 'pinknoise' | 'browniannoise' | 'stream' | 'midi';

export type VisualizerType = 'bitmap' | 'vector';

export type Channel = 'left' | 'right';

export type CustomizedParameters = {
  analyser?: {
    visualizer: VisualizerType;
  };
  recorder?: {
    channel: RecordType;
    bit: QuantizationBit;
    type: WaveExportType;
  };
  audio?: {
    playbackRate: boolean;
    vocalcanceler?: {
      algorithm: VocalCancelerAlgorithm;
      minFrequency?: number;
      maxFrequency?: number;
      threshold?: number;
    };
  };
  constraints?: MediaStreamConstraints;
};

export type RIRDescriptor = {
  url: string;
  value: number;
  label: string;
  group: string;
};

export type MMLDescriptor = {
  title: string;
  artist: string;
  description: string;
  melody: string;
  bass: string;
};
