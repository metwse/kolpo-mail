/* global pool */

import token from '../token.js';
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(process.env.BCRYPT_ROUNDS);

async function signup(req, res) {
  const passwordHash = await bcrypt.hash(req.body.password, salt);

  try {
    const query = await pool.query(
      'INSERT INTO users ("email", "password") VALUES ($1, $2) RETURNING "id";',
      [req.body.email, passwordHash]
    );

    // ID retured as string since JSON.parse does not support bigint.
    const id = query.rows[0].id;

    res.send({
      id,
      token: token.sign({ email: req.body.email, id }, '1h')
    });
  } catch {
    res.status(409).send({
      message: "Could not create account.",
      details: "Perhaps, an account with same name exists?"
    });
  }
}

async function login(req, res) {
  const query = await pool.query(
    'SELECT "id", "password" FROM users WHERE "email" = $1;',
    [req.body.email]
  );

  if (query.rows.length != 1) {
    return res.status(404).send({
      message: "Could not log into the account.",
      details: "The account is not exists."
    });
  }

  if (!await bcrypt.compare(req.body.password, query.rows[0].password)) {
    return res.status(401).send({
      message: "Could not log into the account.",
      details: "Provided password is not valid."
    });
  }

  res.send({
    token: token.sign({
      email: query.rows[0].email,
      id: query.rows[0].id
    }, '1h')
  });
}

export default {
  login, signup
};
