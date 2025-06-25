import express from 'express';
import cors from 'cors';
import { demoData } from './types';
import { computeSectionSum, computeTotalSum } from './utils';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Returns the raw demo data without computed sums
app.get('/api/data', (req, res) => {
    res.json(demoData);
});


// Returns the demo data with all sums computed recursively
app.get('/api/computed-data', (req, res) => {
    const computedData = computeSectionSum(demoData);
    res.json(computedData);
});

// Returns just the total sum for the entire report
app.get('/api/total-sum', (req, res) => {
    const totalSum = computeTotalSum(demoData);
    res.json({ totalSum });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
    });
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});