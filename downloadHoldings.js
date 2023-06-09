import fs from 'fs';
import fetch from 'node-fetch';

async function downloadHoldings(url, path) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const fileStream = fs.createWriteStream(path);
    response.body.pipe(fileStream);

    await fileStream.on('finish', () => {
      console.log(`Downloaded and saved file to ${path}`);
    });

  } catch (error) {
    console.error(`Error downloading file: ${error}`);
  }
}

export default downloadHoldings;