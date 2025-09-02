import jwt from 'jsonwebtoken';


function sign(token, expiresIn) {
  return jwt.sign(token, process.env.JWT_SECRET, { expiresIn });
}

function verify(webtoken) {
  return jwt.verify(webtoken, process.env.JWT_SECRET);
}


export default {
  verify, sign
};
