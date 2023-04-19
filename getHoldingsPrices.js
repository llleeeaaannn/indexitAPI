import fs from 'fs/promises';

const getHoldingsPrices = async () => {

  const BATCHSIZE = 50;
  const CALLDELAY = 90 * 1000;

  let stocks;

  const pricedStocks = {};

  try {
    // Import Holdings data
    const data = await fs.readFile('output.json', 'utf8');
    stocks = JSON.parse(data);
    console.log('JSON got');
  } catch (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  // Function to make the API call for a single stock
  async function callApiForStock(stock) {
    const response = await fetch(`https://api.tradier.com/v1/markets/quotes?symbols=${stock.ticker}`, {
      headers: {
        'Authorization': 'Bearer hVEHMAAnKrWiKuc5sBN9720QtWTg',
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      console.log('Response failed')
    } else {
      const data = await response.json();
      console.log(`API call result for ${stock.ticker}:`, data);

      pricedStocks[stock.ticker] = data;
    }
  }
  
  // Function to call a batch of stocks
  async function processBatch(batch) {
    for (const ticker of batch) {
      await callApiForStock(stocks[ticker]);
    }
  }
  
  // Function to iterate over the stocks object and make API calls
  async function makeApiCalls() {
    const stockKeys = Object.keys(stocks);
  
    for (let i = 0; i < 70; i += BATCHSIZE) {
      const batch = stockKeys.slice(i, i + BATCHSIZE);
  
      // Process the current batch
      await processBatch(batch);
  
      // If there are more stocks to process, wait for the delay between calls
      if (i + BATCHSIZE < 70) {
        await new Promise((resolve) => setTimeout(resolve, CALLDELAY));
      }
    }
  }
  
  await makeApiCalls();

  console.log(pricedStocks)

  // Write data to file
  try {
    await fs.writeFile('prices.json', JSON.stringify(pricedStocks, null, 2), 'utf-8');
    console.log('Data written to output.json');
  } catch (err) {
    console.error('Error writing data to file:', err);
  }

  // Store price for each stock

  // Write data with new price to file
}

export default getHoldingsPrices;
