import cors from 'cors';
import express from 'express';
import getHoldingsData from './parseHoldings.js';
import getHoldingsPrices from './getPrices.js';

import holdings from './routes/holdings.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const callFunctions = async () => {
  await getHoldingsData();
  await getHoldingsPrices();
}

callFunctions();

const errorHandler = function(error, req, res, next) {
  console.log(`Error: ${error.message}`);
  res.status(404);
  res.send('Invalid Path');
}

app.use('/holdings', holdings);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
