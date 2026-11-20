export const BASE_URL = '/assets';
export const SESSION_STORAGE_KEY = 'xsound.app-config';
export const NUMBER_OF_ONESHOTS = 88;
export const NUMBER_OF_PIANO_KEYBOARDS = 88;
export const NUMBER_OF_CHANNELS = 2;
export const NUMBER_OF_TRACKS = 4;
export const AJAX_TIMEOUT = 60000;
export const FOCUSABLE_ELEMENTS = 'a, button, input:not([type="checkbox"]):not([type="file"]), select, textarea, svg, [tabindex], [contentEditable]';

export const CONSTRAINTS = {
  audio: {
    echoCancellation: true
  },
  video: false
} as const;

export const IDS = {
  analyser: 'analyser-fieldset',
  mml: 'mml-fieldset',
  channel0: 'svg-path-recorder-channel-0',
  channel1: 'svg-path-recorder-channel-1'
} as const;
