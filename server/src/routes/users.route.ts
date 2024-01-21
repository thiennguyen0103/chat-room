import * as express from "express";
import { getUser, signIn, signUp } from "../controllers/users.controller";

const userRoutes = express.Router();

userRoutes.post("/sign-up", signUp);
userRoutes.post("/sign-in", signIn);
userRoutes.get("/get-user", getUser);

export default userRoutes;
