import React from 'react';
import renderer from 'react-test-renderer';
import { Props, ProgressBar } from './ProgressBar';

describe('atoms/ProgressBar', () => {
  test('manual', () => {
    const props = {
      id   : 'progress-bar-manual',
      label: 'Progress Bar',
      rate : 50
    } as Props;

    const tree = renderer.create(<ProgressBar {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('manual max', () => {
    const props = {
      id   : 'progress-bar-manual',
      label: 'Progress Bar',
      rate : 101
    } as Props;

    const tree = renderer.create(<ProgressBar {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('auto', () => {
    const props = {
      id   : 'progress-bar-auto',
      label: 'Progress Bar'
    } as Props;

    const tree = renderer.create(<ProgressBar {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
