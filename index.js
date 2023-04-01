import cors from 'cors';
import express from 'express';

import holdings from './routes.holdings.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const errorHandler = function(error, req, res, next) {
  console.log(`Error: ${error.message}`);
  res.status(404);
  res.send('Invalid Path');
}

app.use('/holdings', holdings);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${Port}`));
