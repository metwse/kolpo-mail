import { Router } from 'express';
import * as z from 'zod';
import { validate } from '../middleware.js';
import accounts from '../services/accounts.js';

const router = new Router();

router.post('/login', validate('body', {
  email: z.email(),
  password: z.string(),
}), accounts.login);

router.post('/signup', validate('body', {
  email: z.email(),
  password: z.string(),
}), accounts.signup);

export default router;
