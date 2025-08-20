'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Board from './components/Board';
import GameControls from './components/GameControls';
import GameStatus from './components/GameStatus';
import { GameState, GameMode } from './types/game';
import { checkWinner, isBoardFull, getComputerMove } from './utils/gameUtils';

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  gameMode: 'two-player',
  status: 'playing',
  winner: null,
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  const handleMove = useCallback((index: number) => {
    if (gameState.board[index] || gameState.status !== 'playing') return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const winner = checkWinner(newBoard);
    const isDraw = !winner && isBoardFull(newBoard);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      status: winner ? 'won' : isDraw ? 'draw' : 'playing',
      winner: winner,
    }));

    if (!winner && !isDraw && gameState.gameMode === 'single' && gameState.currentPlayer === 'X') {
      setIsComputerTurn(true);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState.gameMode === 'single' && isComputerTurn && gameState.status === 'playing') {
      const timer = setTimeout(() => {
        handleMove(getComputerMove(gameState.board));
        setIsComputerTurn(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isComputerTurn, gameState.gameMode, gameState.status, handleMove, gameState.board]);

  const handleNewGame = (mode: GameMode) => {
    setGameState({
      ...initialState,
      gameMode: mode,
    });
    setIsComputerTurn(false);
  };

  const handleReset = () => {
    setGameState(prev => ({
      ...initialState,
      gameMode: prev.gameMode,
    }));
    setIsComputerTurn(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" align="center" color="primary" gutterBottom>
          Tic Tac Toe
        </Typography>
        
        <GameControls
          onNewGame={handleNewGame}
          onReset={handleReset}
          gameInProgress={gameState.status === 'playing'}
        />

        <GameStatus gameState={gameState} />

        <Board
          board={gameState.board}
          onCellClick={handleMove}
          disabled={isComputerTurn || gameState.status !== 'playing'}
        />
      </Box>
    </Container>
  );
}
