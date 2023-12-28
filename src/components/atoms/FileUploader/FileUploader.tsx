import React, { useCallback, useId, useRef } from 'react';

export type Props = {
  accept: string;
  disabled: boolean;
  placeholder: string;
  filename: string;
  drag?: boolean | undefined;
  drop?: boolean | undefined;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

export const FileUploader: React.FC<Props> = (props: Props) => {
  const { accept, disabled, placeholder, filename, drag = false, drop = false, tabIndex, onChange } = props;

  const fileUploaderRef = useRef<HTMLInputElement>(null);

  const id = useId();

  const onClickCallback = useCallback(() => {
    const node = fileUploaderRef.current;

    if (node === null) {
      return;
    }

    node.value = '';
    node.click();
  }, []);

  return (
    <label className={`FileUploader${drag ? ' -drag' : ''}${drop ? ' -drop' : ''}`}>
      <button type='button' aria-controls={id} disabled={disabled} tabIndex={tabIndex} onClick={onClickCallback}>
        {filename ? filename : placeholder}
      </button>
      <input type='file' ref={fileUploaderRef} id={id} accept={accept} disabled={disabled} tabIndex={-1} onChange={onChange} />
    </label>
  );
};
