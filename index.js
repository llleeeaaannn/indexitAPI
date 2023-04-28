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

const testFunction = () => {
  console.log('This test function was just called');
}

// cron.schedule('0 0 10 * * Monday,Tuesday,Wednesday,Thursday,Friday', testFunction);

cron.schedule('0 34 7 * * Monday,Tuesday,Wednesday,Thursday,Friday', () => {
  console.log('Running a test of Node-Cron');
  testFunction();
}, {
  timezone: "America/New_York"
});

// Function to call parseHoldings and fetchPrices for testing
const callFunctions = async () => {
  await parseHoldings();
  await fetchPrices();
}

// callFunctions();

// Error handling function for entire application
const errorHandler = function(error, req, res, next) {
  console.log(`Error: ${error.message}`);
  res.status(404);
  res.send('Invalid Path');
}

app.use('/holdings', holdings);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
