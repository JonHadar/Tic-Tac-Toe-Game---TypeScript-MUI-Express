import Stack from '@mui/material/Stack';
import ScoreBoard from './ScoreBoard';
import { StatsPanelProps } from './types';

export default function StatsPanel({ sessionStats, globalStats }: StatsPanelProps) {
  return (
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
  );
}