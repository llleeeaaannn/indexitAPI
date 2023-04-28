import fetch from 'node-fetch';

const URL = 'https://www.ssga.com/us/en/intermediary/etfs/library-content/products/fund-data/etfs/us/holdings-daily-us-en-spy.xlsx';
const PATH = './SPYHoldings.xlsx';

async function downloadHoldingsFile(url, path) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const fileStream = fs.createWriteStream(path);
    response.body.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log(`Downloaded and saved file to ${path}`);
    });

  } catch (error) {
    console.error(`Error downloading file: ${error}`);
  }
}

export default downloadHoldingsFile;