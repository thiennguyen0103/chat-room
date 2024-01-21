import * as express from "express";
import { signIn, signUp } from "../controllers/users.controller";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);

export default userRoutes;
