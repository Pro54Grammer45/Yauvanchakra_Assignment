'use client';

import { FC, KeyboardEvent, FocusEvent } from 'react';

interface TagInputTwoProps {
  notes: string[];
  addNote: (
    e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => void;
  removeNote: (index: number) => void;
}

const TagInputTwo: FC<TagInputTwoProps> = ({
  notes,
  addNote,
  removeNote,
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
      className="react-tag-input__input"
      type="text"
      onBlur={addNote}
      onKeyDown={e => (e.key === 'Enter' ? addNote(e) : undefined)}
      placeholder="Press enter to add variant"
    />
  </div>
);

export default TagInputTwo;
