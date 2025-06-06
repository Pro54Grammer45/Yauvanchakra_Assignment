'use client';

import { FC, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';

interface TagInputProps {
  notes: string[];
  addNote: (
    e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => void;
  removeNote: (index: number) => void;
  getInputValue: (name: string) => string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  setShowKeyBoard: (show: boolean) => void;
  setInputName: (name: string) => void;
}

const TagInput: FC<TagInputProps> = ({
  notes,
  addNote,
  removeNote,
  getInputValue,
  onChangeInput,
  setShowKeyBoard,
  setInputName,
}) => (
  <div className="react-tag-input">
    <ul id="tags">
      {notes.map((note, index) => (
        <li key={index} className="react-tag-input__tag">
          <span className="tag-title react-tag-input__tag__content">{note}</span>
          <span
            className="react-tag-input__tag__remove"
            onClick={() => removeNote(index)}
          />
        </li>
      ))}
    </ul>

    <input
      name="note"
      value={getInputValue('note')}
      onChange={onChangeInput}
      onFocus={() => {
        setShowKeyBoard(true);
        setInputName('note');
      }}
      className="react-tag-input__input"
      type="text"
      onBlur={addNote}
      onKeyUp={e => (e.key === 'Enter' ? addNote(e) : undefined)}
      placeholder="Press enter to add note"
    />
  </div>
);

export default TagInput;
