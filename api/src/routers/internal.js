import { Router } from 'express';
import * as z from 'zod';
import { validate } from '../middleware.js';
import internal from '../services/internal.js';


const router = new Router();

router.post('/mail', validate('body', {
  from: z.email(),
  to: z.email(),
  title: z.string(),
  content: z.string(),
  type: z.union([
    z.literal('html'),
    z.literal('text'),
  ]),
}), internal.sendMail);


export default router;
