import zod from 'zod';
import tokenProvider from './token.js';


function validate(source, schema) {
  const zodObj = zod.object(schema);
  return (req, res, next) => {
    const result = zodObj.safeParse(req[source]);

    if (!result.success)
      return res.status(400).json({
        message: "malformed request",
        details: JSON.parse(result.error.message),
      });

    if (source == 'query')
      req.parsedQuery = result.data;
    else
      req[source] = result.data;

    next();
  };
}

function authenticationRequired(req, res, next) {
  const token = req.query.token || req.headers.authorization || req.body?.token;
  try {
    req.user = tokenProvider.verify(token);
    next();
  } catch {
    res.status(401).send({
      message: "Could not verify token.",
      details: "Perhaps, no token has or provided token has been expired or invalid."
    });
  }
}


export {
  validate, authenticationRequired
};
