export interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  players: {
    player1: String
    player2: String
  }
}

export interface StartScreenProps {
  onGameStart: (player1: string, player2: string) => void;
}

export interface ScoreBoardProps {
    title: string;
    xScore: number;
    oScore: number;
    color: string;
    textColor?: string;
}

export interface GameGridProps {
  squares: (string | null)[];
  onSquareClick: (i: number) => void;
}

export interface StatsPanelProps {
  sessionStats: { X: number; O: number };
  globalStats: { X: number; O: number };
}