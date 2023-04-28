import cors from 'cors';
import cron from 'node-cron';
import express from 'express';
import fetchPrices from './fetchPrices.js';
import parseHoldings from './parseHoldings.js';

import holdings from './routes/holdings.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Function to call parseHoldings and fetchPrices
const updateHoldingsAndPrices = async () => {
  await parseHoldings();
  await fetchPrices();
}

// Call updatedHoldingsAndPrices every weekday at 10:00 New York time
cron.schedule('0 0 10 * * Monday,Tuesday,Wednesday,Thursday,Friday', () => {
  updateHoldingsAndPrices();
}, {
  timezone: "America/New_York"
});


// Error handling function for entire application
const errorHandler = function(error, req, res, next) {
  console.log(`Error: ${error.message}`);
  res.status(404);
  res.send('Invalid Path');
}

app.use('/holdings', holdings);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
