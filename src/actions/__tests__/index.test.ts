import { ActionTypes } from '../ActionTypes';
import {
  changeCurrentSoundSource,
  changeAnalyserState,
  changeMMLState,
  downMelodyKeyboards,
  downBassKeyboards,
  upMelodyKeyboards,
  upBassKeyboards
} from '../';
import {
  SoundSource,
  CurrentSoundSourceAction,
  AnalyserStateAction,
  MMLStateAction,
  KeyboardAction
} from '../../types';

describe('Actions', () => {
  test('should create an action to change current sound source', () => {
    const payload        = 'oscillator' as SoundSource;
    const expectedAction = {
      type: ActionTypes.CHANGE_CURRENT_SOUND_SOURCE,
      payload
    } as CurrentSoundSourceAction;

    expect(changeCurrentSoundSource(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to change analyser state', () => {
    const payload        = true;
    const expectedAction = {
      type: ActionTypes.CHANGE_ANALYSER_STATE,
      payload
    } as AnalyserStateAction;

    expect(changeAnalyserState(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to change MML state', () => {
    const payload        = true;
    const expectedAction = {
      type: ActionTypes.CHANGE_MML_STATE,
      payload
    } as MMLStateAction;

    expect(changeMMLState(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to down keyboards for melody', () => {
    const payload        = [40, 44, 47];
    const expectedAction = {
      type: ActionTypes.DOWN_MELODY_KEYBOARDS,
      payload
    } as KeyboardAction;

    expect(downMelodyKeyboards(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to down keyboards for bass', () => {
    const payload        = [28, 32, 35];
    const expectedAction = {
      type: ActionTypes.DOWN_BASS_KEYBOARDS,
      payload
    } as KeyboardAction;

    expect(downBassKeyboards(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to up keyboards for melody', () => {
    const payload        = [40, 44, 47];
    const expectedAction = {
      type: ActionTypes.UP_MELODY_KEYBOARDS,
      payload
    } as KeyboardAction;

    expect(upMelodyKeyboards(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to up keyboards for bass', () => {
    const payload        = [28, 32, 35];
    const expectedAction = {
      type: ActionTypes.UP_BASS_KEYBOARDS,
      payload
    } as KeyboardAction;

    expect(upBassKeyboards(payload)).toStrictEqual(expectedAction);
  });
});
