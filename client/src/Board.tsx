import { useEffect, useState } from 'react';
import { BoardProps } from './types';
import Square from './Square';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ScoreBoard from './ScoreBoard';
import Box from '@mui/material/Box';

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as 'X' | 'O';
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay, players }: BoardProps) {

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

  <div className="status">
    {status}
  </div>

  return (
    <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        mt: 8, 
        gap: 8 
    }}>
      
      <Stack spacing={3} sx={{ width: '220px', mt: '75px' }}>
          <ScoreBoard 
              title="Current Session" 
              xScore={sessionStats.X} 
              oScore={sessionStats.O} 
              color="#e3f2fd" 
              textColor='red'
          />
          <ScoreBoard 
              title="All Time (Server)" 
              xScore={globalStats.X} 
              oScore={globalStats.O} 
              color="#ffebee" 
              textColor='red'
          />
      </Stack>

      <Stack alignItems="center" spacing={2}>
          <Typography 
            variant='h4' 
            sx={{ 
                color: 'red', 
                fontWeight: 'bold', 
                mb: 1, 
                minHeight: '40px', 
                textAlign: 'center' 
            }}
          >
            {status}
          </Typography>

          <Box sx={{ p: 1, borderRadius: 2, boxShadow: 3 }}>
            <Stack>
              <Stack direction="row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
              </Stack>
              <Stack direction="row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
              </Stack>
              <Stack direction="row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
              </Stack>
            </Stack>
          </Box>
      </Stack>
    </Box>
  );
}

export default Board;