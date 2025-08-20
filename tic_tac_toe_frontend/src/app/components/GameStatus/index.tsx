'use client';

import { Typography, Box } from '@mui/material';
import { GameState } from '../../types/game';

interface GameStatusProps {
  gameState: GameState;
}

const GameStatus = ({ gameState }: GameStatusProps) => {
  const getStatusMessage = () => {
    if (gameState.status === 'won') {
      return `Player ${gameState.winner} wins!`;
    }
    if (gameState.status === 'draw') {
      return "It's a draw!";
    }
    return `Current player: ${gameState.currentPlayer}`;
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography
        variant="h5"
        align="center"
        color={gameState.status === 'won' ? 'error.main' : 'primary.main'}
      >
        {getStatusMessage()}
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary">
        {gameState.gameMode === 'single' ? 'Playing vs Computer' : 'Two Player Mode'}
      </Typography>
    </Box>
  );
};

export default GameStatus;
