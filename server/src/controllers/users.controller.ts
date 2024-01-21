import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import JWT from "../configs/jwt.config";
import { sendResponseError } from "../middleware/middleware";
import Users from "../models/users.model";
import { checkPassword, newToken } from "../utils/helper";

const signUp = async (req, res) => {
  const { password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);

    await Users.create({ ...req.body, password: hash });
    res.status(201).send("Successfully account opened ");
    return;
  } catch (err) {
    console.log("Error : ", err);
    sendResponseError(500, "Something wrong please try again", res);
    return;
  }
};

const signIn = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await Users.findOne({ email });
    console.log(user);
    if (!!!user) {
      sendResponseError(400, "You have to Sign up first !", res);
    }

    const same = await checkPassword(password, user.password);
    if (same) {
      let token = newToken(user);
      res.status(200).send({ status: "ok", token });
      return;
    }
    sendResponseError(400, "InValid password !", res);
  } catch (err) {
    console.log("ERROR", err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const getUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log({ token });
  if (token == null) return sendResponseError(401, "Unauthorized", res);

  jwt.verify(token, JWT.jwt, async (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    const existingUser = await Users.findOne({ _id: user.id });

    if (!existingUser) {
      return sendResponseError(404, "User not found", res);
    }

    res.status(200).send({ status: "ok", user: existingUser });
    return;
  });
};

export { getUser, signIn, signUp };
