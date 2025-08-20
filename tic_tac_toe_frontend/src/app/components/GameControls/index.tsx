'use client';

import { Button, Stack } from '@mui/material';
import { GameMode } from '../../types/game';
import { BiReset } from 'react-icons/bi';
import { FaUserFriends, FaRobot } from 'react-icons/fa';

interface GameControlsProps {
  onNewGame: (mode: GameMode) => void;
  onReset: () => void;
  gameInProgress: boolean;
}

const GameControls = ({ onNewGame, onReset, gameInProgress }: GameControlsProps) => {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 3 }}>
      <Button
        variant="contained"
        startIcon={<FaRobot />}
        onClick={() => onNewGame('single')}
        disabled={gameInProgress}
      >
        vs Computer
      </Button>
      <Button
        variant="contained"
        startIcon={<FaUserFriends />}
        onClick={() => onNewGame('two-player')}
        disabled={gameInProgress}
      >
        Two Players
      </Button>
      <Button
        variant="outlined"
        startIcon={<BiReset />}
        onClick={onReset}
        disabled={!gameInProgress}
      >
        Reset Game
      </Button>
    </Stack>
  );
};

export default GameControls;
