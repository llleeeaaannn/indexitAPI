import fs from 'fs';

const getHoldingsPrices = () => {

  // Import Holdings data
  fs.readFile('output.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Parse the JSON data and store it as a variable
    try {
      const jsonData = JSON.parse(data);
      console.log('JSON data:', jsonData);

      // You can use the jsonData variable in your function now
      // Do something with jsonData...

    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

  // Seperate data into segments

  // Assign time to each segment

  // Call API for each stock in segment

  // Store price for each stock

  // Write data with new price to file
}

export default getHoldingsPrices;
