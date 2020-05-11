import CloseIcon from 'mdi-react/CloseIcon';
import FeatherIcon from 'mdi-react/FeatherIcon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { difficultyLevels } from '../../models';
import { ProgressMark } from './ProgressMark';

export const ProgressTrack = observer(
  ({
    track: {
      name = 'Unknown',
      marks = [],
      difficulty = difficultyLevels.troublesome,
      markProgress,
      isComplete,
      resetProgress,
    },
    showDifficulty = true,
  }) => {
    const handleProgressMarked = () => {
      markProgress();
    };

    const handleProgressReset = () => {
      resetProgress();
    };

    const progressMarks = marks.map((mark) => (
      <ProgressMark key={mark.id} mark={mark} onClick={handleProgressMarked} />
    ));

    return (
      <div className="w-full my-2 flex flex-col justify-center items-center uppercase">
        <div className="w-10/12 p-2 flex justify-between items-center bg-gray-200 border border-gray-600">
          <h4 className="text-lg font-bold flex-auto">{name}</h4>
          <div className="mx-2 flex flex-grow-0">
            <button
              type="button"
              title="Edit Track"
              className="block mr-2 bg-transparent"
            >
              <FeatherIcon size={16} />
            </button>
            <button
              type="button"
              title="Clear Progress"
              className="block bg-transparent"
              onClick={handleProgressReset}
            >
              <CloseIcon size={16} />
            </button>
          </div>
          {showDifficulty && (
            <div className="border-l-2 border-gray-600 pl-2">
              <strong>Difficulty:</strong> {difficulty}
            </div>
          )}
        </div>
        <button
          onClick={handleProgressMarked}
          title="Mark Progress"
          type="button"
          disabled={isComplete}
          className={`w-10/12 flex justify-center items-center hover:bg-blue-200 transition-colors duration-200 ${
            isComplete ? 'cursor-not-allowed' : ''
          }`}
        >
          {progressMarks}
        </button>
      </div>
    );
  },
);
