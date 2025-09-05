import { Router } from "express";
import { Well } from "../models/Well";

const router = Router();

router.get("/", async (_, res) => {
  const wells = await Well.findAll();
  res.json(wells);
});

router.post("/", async (req, res) => {
  const well = await Well.create(req.body);
  res.json(well);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Well.update(req.body, { where: { id } });
  res.json({ message: "Well updated" });
});

export default router;
