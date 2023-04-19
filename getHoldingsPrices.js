import fs from 'fs/promises';

const getHoldingsPrices = async () => {

  let holdings = 'Test';

  try {
    // Import Holdings data
    const data = await fs.readFile('output.json', 'utf8');
    holdings = JSON.parse(data);
    console.log('JSON got');
  } catch (err) {
    console.error('Error reading file:', err);
    return;
  }

  console.log(typeof holdings)
  console.log(holdings)


  // Seperate data into segments

  // Assign time to each segment

  // Call API for each stock in segment

  // Store price for each stock

  // Write data with new price to file
}

export default getHoldingsPrices;
