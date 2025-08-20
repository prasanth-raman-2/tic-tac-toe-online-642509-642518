'use client';

import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Board as BoardType, Cell } from '../../types/game';

const StyledCell = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  height: '100px',
  width: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
  '@media (max-width: 600px)': {
    height: '80px',
    width: '80px',
    fontSize: '2rem',
  },
}));

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

const Board = ({ board, onCellClick, disabled }: BoardProps) => {
  return (
    <Box sx={{ maxWidth: '350px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        {board.map((cell: Cell, index: number) => (
          <Grid item xs={4} key={index}>
            <StyledCell
              elevation={2}
              onClick={() => !cell && !disabled && onCellClick(index)}
              sx={{
                color: cell === 'X' ? 'primary.main' : 'error.main',
                cursor: (!cell && !disabled) ? 'pointer' : 'default',
              }}
            >
              {cell}
            </StyledCell>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Board;
