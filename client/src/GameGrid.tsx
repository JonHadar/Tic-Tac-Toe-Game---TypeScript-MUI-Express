import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Square from './Square';
import { GameGridProps } from './types';

export default function GameGrid({ squares, onSquareClick }: GameGridProps) {
  return (
    <Box sx={{ p: 1, borderRadius: 2, boxShadow: 3 }}>
      <Stack>

        <Stack direction="row">
          <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
          <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
          <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
        </Stack>

        <Stack direction="row">
          <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
          <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
          <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
        </Stack>

        <Stack direction="row">
          <Square value={squares[6]} onSquareClick={() => onSquareClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => onSquareClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => onSquareClick(8)}/>
        </Stack>

      </Stack>
    </Box>
  );
}