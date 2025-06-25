import React, { useState } from 'react';
import { Entry } from '../types';

interface EntryComponentProps {
  entry: Entry;
  onUpdate: (updatedEntry: Entry) => void;
  level: number;
}

const EntryComponent: React.FC<EntryComponentProps> = ({ 
  entry, 
  onUpdate, 
  level 
}) => {
  const [isEditingSum, setIsEditingSum] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempSum, setTempSum] = useState(entry.sum.toString());
  const [tempNote, setTempNote] = useState(entry.note);

  const handleSumBlur = () => {
    const newSum = parseFloat(tempSum);
    if (!isNaN(newSum) && newSum !== entry.sum) {
      onUpdate({
        ...entry,
        sum: newSum
      });
    } else {
      setTempSum(entry.sum.toString());
    }
    setIsEditingSum(false);
  };

  const handleNoteBlur = () => {
    if (tempNote !== entry.note) {
      onUpdate({
        ...entry,
        note: tempNote
      });
    }
    setIsEditingNote(false);
  };

  const handleSumKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSumBlur();
    }
  };

  const handleNoteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNoteBlur();
    }
  };

  return (
    <div className="entry" style={{ marginLeft: `${level * 20}px` }}>
      <div className="entry-content">
        <span className="entry-name">{entry.name}</span>
        
        <div className="entry-sum">
          {isEditingSum ? (
            <input
              type="number"
              value={tempSum}
              onChange={(e) => setTempSum(e.target.value)}
              onBlur={handleSumBlur}
              onKeyDown={handleSumKeyDown}
              autoFocus
            />
          ) : (
            <span 
              className="sum-value"
              onClick={() => setIsEditingSum(true)}
            >
              ${entry.sum.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="entry-note">
          {isEditingNote ? (
            <input
              type="text"
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              onBlur={handleNoteBlur}
              onKeyDown={handleNoteKeyDown}
              autoFocus
            />
          ) : (
            <span 
              className="note-value"
              onClick={() => setIsEditingNote(true)}
            >
              {entry.note}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryComponent; 