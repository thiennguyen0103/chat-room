import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import JWT from "../configs/jwt.config";

const checkPassword = (password: string, passwordHash: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        reject(err);
      }

      resolve(same);
    });
  });
};

const newToken = (user) => {
  return jwt.sign({ id: user._id }, JWT.jwt, {
    expiresIn: JWT.jwtExp,
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export { checkPassword, newToken, verifyToken };
