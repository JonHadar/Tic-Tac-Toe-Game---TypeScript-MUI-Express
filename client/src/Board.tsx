import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BoardProps } from './types';

import StatsPanel from './StatsPanel';
import GameGrid from './GameGrid';

const StatusHeader = styled(Typography)({
  color: 'red',
  fontWeight: 'bold',
  marginBottom: '8px',
  minHeight: '40px',
  textAlign: 'center',
});

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as 'X' | 'O';
    }
  }
  return null;
}

export default function Board({ xIsNext, squares, onPlay, players }: BoardProps) {
  const winner = calculateWinner(squares);
  const isDraw = !winner && !squares.includes(null);
  const [sessionStats, setSessionStats] = useState({ X: 0, O: 0 });
  const [globalStats, setGlobalStats] = useState({ X: 0, O: 0 });

  const fetchGlobalStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/stats'); 
      const data = await res.json();
      setGlobalStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const reportWin = async (winnerName: 'X' | 'O') => {
    try {
      await fetch('http://localhost:5000/api/win', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winner: winnerName }),
      });
      console.log('Update sent to server for winner:', winnerName);
      fetchGlobalStats();
    } catch (error) {
      console.error('Error reporting win:', error);
    }
  };

  useEffect(() => {
    fetchGlobalStats();
    const intervalId = setInterval(() => {
      fetchGlobalStats();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (winner) {
      setSessionStats(prev => ({
        ...prev,
        [winner as 'X' | 'O']: prev[winner as 'X' | 'O'] + 1
      }));
      reportWin(winner as 'X' | 'O');
    }
  }, [winner]);

  function handleClick(i: number) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
  }

  let status;
  if(winner) {
    status = "Winner: " + (winner === 'X' ? players.player1 : players.player2);
  } else if (isDraw) {
    status = "No one win this game :(";
  } else {
    status = "Next Player: " + (xIsNext ? players.player1 : players.player2); 
  }

  return (
    <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        mt: 8, 
        gap: 8 
    }}>
      
      <StatsPanel 
        sessionStats={sessionStats} 
        globalStats={globalStats} 
      />

      <Stack alignItems="center" spacing={2}>
        
        <StatusHeader variant='h4'>
          {status}
        </StatusHeader>

        <GameGrid 
          squares={squares} 
          onSquareClick={handleClick} 
        />
        
      </Stack>
    </Box>
  );
}