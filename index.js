import cors from 'cors';
import express from 'express';

import holdings from './routes.holdings.js';

const app = express();

const PORT = process.env.PORT || 5000;
