import express, { Request, Response } from 'express'; 
import cors from 'cors';

const app = express(); 
const PORT = 5000;

app.use(cors());
app.use(express.json());

let victoryStats = {
    X: 0,
    O: 0
};

//Route 1: update on winner and update the counter.
app.post('/api/win', (req: Request, res: Response) => {
    const {winner} = req.body;

    if(winner == 'X' || winner == 'O') {
        victoryStats[winner as 'X' | 'O']++;
        console.log(`Winner updated: ${winner}. Current stats:`, victoryStats);
        res.json({ message: 'Score updated', currentStats: victoryStats }); 
    } else {
        res.json({ message: 'No winner update (Draw or invalid)' });
    }
})

//Route 2: taking the info
app.get('/api/stats', (req: Request, res: Response) => {
    res.json(victoryStats);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});