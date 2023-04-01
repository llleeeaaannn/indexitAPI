import cors from 'cors';
import express from 'express';

import holdings from './routes.holdings.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/holdings', holdings);

app.listen(PORT, () => console.log(`Server running on port ${Port}`));
