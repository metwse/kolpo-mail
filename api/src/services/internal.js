/* global pool */

async function sendMail(req, res) {
  let userId = await pool.query(
    'SELECT "id" FROM users WHERE "email" = $1',
    [req.body.to]
  );

  if (userId.rows.length == 0)
    return res.status(404).send({
      message: "Cannot send mail.",
      details: "User not found."
    });

  userId = userId.rows[0].id;

  await pool.query(
    'INSERT INTO mails ("from", "to", "date", "content", "type") \
      VALUES ($1, $2, NOW(), $3, $4);',
    [req.body.from, userId, req.body.content, req.body.type]
  );

  res.send(true);
}


export default {
  sendMail
};
