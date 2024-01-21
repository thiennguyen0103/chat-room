import Users from "../models/users.model";
import * as bcrypt from "bcrypt";
import { checkPassword, newToken } from "../utils/helper";
import { sendResponseError } from "../middleware/middleware";

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
  console.log(req.body);
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

export { signUp, signIn };
