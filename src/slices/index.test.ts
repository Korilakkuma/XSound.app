import {
  reducer,
  initialState,
  activateMIDIKeyboards,
  deactivateMIDIKeyboards,
  changeAnalyserState,
  changeCurrentSoundSource,
  changeMMLState,
  changeOscillatorStates,
  downBassKeyboards,
  downMelodyKeyboards,
  upBassKeyboards,
  upMelodyKeyboards,
  setMasterVolume
} from '/src/slices';

describe('activeMIDIKeyboardsReducer', () => {
  test('should return array that contains number as MIDI keyboard index', () => {
    const action = activateMIDIKeyboards([39, 43, 46]);
    const state = reducer(initialState, action);

    expect(state.activeMIDIKeyboardIndexes).toStrictEqual([39, 43, 46]);
  });

  test('should return array that excepts for the designated number as MIDI keyboard index', () => {
    const action = deactivateMIDIKeyboards(43);
    const state = reducer(reducer(initialState, activateMIDIKeyboards([39, 43, 46])), action);

    expect(state.activeMIDIKeyboardIndexes).toStrictEqual([39, 46]);
  });
});

describe('analyserStateReducer', () => {
  test('should return true', () => {
    const action = changeAnalyserState(true);
    const state = reducer(initialState, action);

    expect(state.analyserState).toBe(true);
  });
});

describe('currentSoundSourceReducer', () => {
  test('should return other `SoundSource`', () => {
    const action = changeCurrentSoundSource('piano');
    const state = reducer(initialState, action);

    expect(state.currentSoundSource).toBe('piano');
  });
});

describe('keyboardIndexesReducer', () => {
  test('should return array that contains number as piano melody keyboard index on down', () => {
    const action = downMelodyKeyboards([39, 43, 46]);
    const state = reducer(initialState, action);

    expect(state.downMelodyKeyboardIndexes).toStrictEqual([39, 43, 46]);
  });

  test('should return array that contains number as piano bass keyboard index on down', () => {
    const action = downBassKeyboards([27, 31, 34]);
    const state = reducer(initialState, action);

    expect(state.downBassKeyboardIndexes).toStrictEqual([27, 31, 34]);
  });

  test('should return array that contains number as piano melody keyboard index on up', () => {
    const action = upMelodyKeyboards([39, 43, 46]);
    const state = reducer(initialState, action);

    expect(state.upMelodyKeyboardIndexes).toStrictEqual([39, 43, 46]);
  });

  test('should return array that contains number as piano bass keyboard index on up', () => {
    const action = upBassKeyboards([27, 31, 34]);
    const state = reducer(initialState, action);

    expect(state.upBassKeyboardIndexes).toStrictEqual([27, 31, 34]);
  });
});

describe('mmlStateReducer', () => {
  test('should return true', () => {
    const action = changeMMLState(true);
    const state = reducer(initialState, action);

    expect(state.mmlState).toBe(true);
  });
});

describe('oscillatorStatesReducer', () => {
  test('should return `[false, true]`', () => {
    const action = changeOscillatorStates([false, true]);
    const state = reducer(initialState, action);

    expect(state.oscillatorStates).toStrictEqual([false, true]);
  });
});

describe('mastervolumeReducer', () => {
  test('should return decreased mastervolume`', () => {
    const action = setMasterVolume(0.25);
    const state = reducer(initialState, action);

    expect(state.mastervolume).toBeCloseTo(0.25, 2);
  });

  test('should return increased mastervolume', () => {
    const action = setMasterVolume(0.95);
    const state = reducer({ ...initialState, mastervolume: 0.1 }, action);

    expect(state.mastervolume).toBeCloseTo(0.95, 2);
  });
});
