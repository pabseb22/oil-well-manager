import express from "express";
import cors from "cors";
import wellsRouter from "./routes/wells";
import { Well } from "./models/Well";
import { sequelize } from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/wells", wellsRouter);

// Sincroniza y arranca el servidor
sequelize.sync({ force: true }).then(async () => {
  console.log("DB Synced ✅");

  // Insertar pozos de muestra
  await Well.bulkCreate([
    { name: "Pozo A", location: "Amazonas", daily_production: 1200.5, status: "activo" },
    { name: "Pozo B", location: "Oriente", daily_production: 800.0, status: "inactivo" },
    { name: "Pozo C", location: "Costa", daily_production: 1500.3, status: "activo" },
    { name: "Pozo D", location: "Sierra", daily_production: 950.7, status: "activo" },
    { name: "Pozo E", location: "Oriente Norte", daily_production: 600.2, status: "inactivo" }
  ]);

  // Levantar backend
  app.listen(3000, () => console.log("🚀 Backend running on port 3000"));
});
