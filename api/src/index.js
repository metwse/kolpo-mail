/* global production:writable, pool:writable */
/* exported pool */

import dotenv from 'dotenv';
import { Pool } from 'pg';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config({ quiet: true });

import accountsRouter from './routers/accounts.js';
import mailsRouter from './routers/mails.js';


production = globalThis.production = process.env.NODE_ENV == 'production';

pool = globalThis.pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const app = express();

app.use(express.json());
app.use(cors());

if (!production)
  app.use(morgan('tiny'));

app.get('/', (_, res) => {
  res.send({
    message: "OK",
    uptime: Math.ceil(performance.now() / 1000),
  });
});

app.get('/favicon.ico', (_, res) => res.status(204).end());

app.use(accountsRouter);
app.use('/mails', mailsRouter);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
