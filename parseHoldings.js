import XLSX from 'xlsx';
import fs from 'fs/promises';
import { replaceDotsAndHyphens } from './methods.js';

const parseHoldings = async () => {

  // Read holdings XLSX file
  const workbook = XLSX.readFile('spyholdings.xlsx');

  // Get first name from list of sheet names
  const sheetName = workbook.SheetNames[0];

  // Get first sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert XLSX to JSON
  const data = XLSX.utils.sheet_to_json(sheet);

  // Remove the first three and last six objects
  const tickerData = data.slice(3, data.length - 6);

  // Function that takes tickerData array, reformats the objects and returns them in an object
  const formattedData = tickerData.reduce((acc, item) => {
    const price = Math.floor(Math.random() * (250 - 50 + 1) + 50);
    const ticker = replaceDotsAndHyphens(item['SPDR® S&P 500® ETF Trust']);
    acc[ticker] = {
      ticker: ticker,
      name: item['Fund Name:'],
      weight: item['__EMPTY_2'],
      sedol: item['__EMPTY_1'],
      identifier: item['__EMPTY'],
      shares: item['__EMPTY_4'],
      sector: item['__EMPTY_3'],
      price: price,
      originalprice: price
    };
    return acc;
  }, {});

  // Write data to file
  try {
    await fs.writeFile('output.json', JSON.stringify(formattedData, null, 2), 'utf-8');
    console.log('Data written to output.json');
  } catch (err) {
    console.error('Error writing data to file:', err);
  }
}

export default parseHoldings;
