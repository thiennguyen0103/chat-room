import * as cors from "cors";
import * as express from "express";
import connectDb from "./configs/db.config";

connectDb();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
