import zod from 'zod';

function validate(source, schema) {
  const zodObj = zod.object(schema);
  return (req, res, next) => {
    req[source] = zodObj.safeParse(req[source]);

    if (!req[source].success)
      return res.status(400).json({
        message: "malformed request",
        details: JSON.parse(req[source].error.message),
      });

    req.body = req.body.data;

    next();
  };
}

function authenticationRequired(req, res, next) {
  /// TODO
}

export default {
  validate
};
