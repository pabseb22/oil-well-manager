import express from "express";
import cors from "cors";
import wellsRouter from "./routes/wells";
import { sequelize } from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/wells", wellsRouter);

sequelize.sync().then(() => {
  console.log("DB Connected");
  app.listen(3000, () => console.log("Backend running on port 3000"));
});
