import { useState } from 'react';
import Board from './Board';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StartScreen from './StartScreen';

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const [players, setPlayers] = useState({ player1: '', player2: '' });

  const [gameStarted, setGameStarted] = useState(false);

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handleGameStart(player1: string, player2: string) {
    setPlayers({player1, player2})
    setGameStarted(true)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      
      <ListItem key={move}>
        <Button variant="contained" onClick={() => jumpTo(move)} > {description} </Button>
      </ListItem>
    );
  });

  return (

    !gameStarted ? (
      <StartScreen onGameStart={handleGameStart}/>
    ) : (

        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Container sx={{ mt:4 }}> 
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={20}
            >

              <Stack sx={{ transform: 'translateX(100px)' }}>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} players={players} />
              </Stack>

              <Stack sx={{padding: '69px', margin: '55px'}} > {/* moves history list */}
                <Typography variant="h4" sx={{fontWeight: 'bold', color: 'red', whiteSpace: 'nowrap'}}> Moves History </Typography>
                <List> {moves} </List>
              </Stack>

            </Stack>
        </Container> 
      </Box>   
    )
  );  
}