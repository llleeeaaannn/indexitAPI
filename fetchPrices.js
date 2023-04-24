import fs from 'fs/promises';
import fetch from 'node-fetch';

const getPrices = async () => {

  // Batch size defines size of API call batch and delay between batches
  const BATCHSIZE = 50;
  const CALLDELAY = 90 * 1000;

  let stocks;

  // Object of stocks with price data included
  const pricedStocks = {};

  try {
    // Import Holdings data
    const data = await fs.readFile('output.json', 'utf8');
    stocks = JSON.parse(data);
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
      // Assign data top pricedStocks object
      const data = await response.json();
      console.log(data);
      const price = data.quotes.quote.last.toFixed(2);
      pricedStocks[stock.ticker] = stock;
      pricedStocks[stock.ticker].price = price;
      pricedStocks[stock.ticker].originalprice = price;
      pricedStocks[stock.ticker].percentchange = data.quotes.quote.change_percentage;
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
    // Create array of stock keys
    const stockKeys = Object.keys(stocks);

    for (let i = 0; i < stockKeys.length; i += BATCHSIZE) {
      // Create next batch
      const batch = stockKeys.slice(i, i + BATCHSIZE);

      // Process the current batch
      await processBatch(batch);

      // If there are more stocks to process, wait for the delay between calls
      if (i + BATCHSIZE < stockKeys.length) {
        await new Promise((resolve) => setTimeout(resolve, CALLDELAY));
      }
    }
  }

  await makeApiCalls();

  // Write data with new price to file
  try {
    await fs.writeFile('prices.json', JSON.stringify(pricedStocks, null, 2), 'utf-8');
    console.log('Data written to output.json');
  } catch (err) {
    console.error('Error writing data to file:', err);
  }

}

export default getPrices;
