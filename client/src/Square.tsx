import { SquareProps } from './types';
import Button from '@mui/material/Button'

function Square({ value, onSquareClick }: SquareProps) {
  return (

    <Button
      onClick={onSquareClick}
      sx={{
        width: 150,
        height: 150,
        fontSize: '8rem',
        fontWeight: 'bold',
        backgroundColor: 'wheat',
        border: '3px solid black',
        borderRadius: '15px',
        transition: 'all 0.2s ease',

        color: value === 'X' ? 'green' : (value === 'O' ? 'blue' : 'black'),

        minWidth: 'auto',
        padding: 0,

        '&:hover': {
          backgroundColor: '#b3e5fc',
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)'
        }
      }} 
    >

      {value}

    </Button>
  );
}

export default Square;