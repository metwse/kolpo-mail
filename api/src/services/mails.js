/* global pool */

async function inbox(req, res) {
  if (req.parsedQuery.before > 0) {
    const query = await pool.query(
      'SELECT "id", "from", "date", "content", "type" FROM mails \
        WHERE "to" = $1 AND "id" < $2\
        ORDER BY "id" DESC LIMIT $3;',
      [req.user.id, req.parsedQuery.before, req.parsedQuery.limit]
    );

    res.send(query.rows);
  } else {
    const query = await pool.query(
      'SELECT "id", "from", "date", "content", "type" FROM mails \
        WHERE "to" = $1 ORDER BY "id" DESC LIMIT $2;',
      [req.user.id, req.parsedQuery.limit]
    );

    res.send(query.rows);
  }
}


export default {
  inbox
};
