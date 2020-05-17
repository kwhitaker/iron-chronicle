import RefreshIcon from 'mdi-react/RefreshIcon';
import FeatherIcon from 'mdi-react/FeatherIcon';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { difficultyLevels, useAppStore } from '../../models';
import { progressRoll, RollModal } from '../ActionRoller';
import { Button, DiceButton } from '../Buttons';
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
      completedMarks,
    },
    onEdit,
    showDifficulty = true,
  }) => {
    const [progressResult, setProgressResult] = useState(null);
    const { currentGame } = useAppStore();

    const clearResult = () => setProgressResult(null);

    const handleProgressMarked = () => {
      markProgress();
    };

    const handleProgressReset = () => {
      resetProgress();
    };

    const handleProgressRolled = () => {
      const result = progressRoll(completedMarks);
      currentGame.addRollResult(result);
      setProgressResult(result);
    };

    const progressMarks = marks.map((mark) => (
      <ProgressMark
        key={mark.id}
        mark={mark}
        onClick={handleProgressMarked}
        disabled={isComplete}
      />
    ));

    return (
      <div className="w-full my-4 flex flex-col justify-center items-center uppercase">
        <div className="w-10/12 p-2 flex justify-between items-center bg-gray-200 border border-gray-600">
          <h4 className="text-lg font-bold flex-auto overflow-hidden truncate">
            {name}
          </h4>
          <div className="mx-2 flex flex-grow-0">
            <DiceButton
              onClick={handleProgressRolled}
              title="Roll Progress"
              transparent
            />
            <Button title="Edit Track" className="block mr-2" onClick={onEdit}>
              <FeatherIcon size={16} />
            </Button>
            <Button
              title="Clear Progress"
              className="block"
              onClick={handleProgressReset}
            >
              <RefreshIcon size={16} />
            </Button>
          </div>
          {showDifficulty && (
            <div className="border-l-2 border-gray-600 pl-2">{difficulty}</div>
          )}
        </div>
        <button
          onClick={handleProgressMarked}
          title="Mark Progress"
          type="button"
          disabled={isComplete}
          data-tip={isComplete ? 'Track Complete' : 'Mark Progress'}
          className={`w-10/12 flex justify-center items-center hover:bg-blue-200 transition-colors duration-200 ${
            isComplete ? 'cursor-not-allowed' : ''
          }`}
        >
          {progressMarks}
        </button>
        {!!progressResult && (
          <RollModal
            stat={{ name: 'progress', value: completedMarks }}
            result={progressResult}
            onRequestClose={clearResult}
          />
        )}
        <ReactTooltip />
      </div>
    );
  },
);
