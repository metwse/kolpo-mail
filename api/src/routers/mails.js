import { Router } from 'express';
import * as z from 'zod';
import { validate, authenticationRequired } from '../middleware.js';
import mails from '../services/mails.js';


const router = new Router();

router.use(authenticationRequired);

router.get('/inbox', validate('query', {
  before: z.preprocess(x => BigInt(x), z.bigint().optional(z).default(-1)),
  limit: z.preprocess(x => BigInt(x), z.bigint().max(24).optional(z).default(24))
}), mails.inbox);


export default router;
