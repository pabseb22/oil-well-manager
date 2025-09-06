import { Router } from "express";
import { Well } from "../models/Well";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const wells = await Well.findAll({
      order: [["id", "ASC"]], // ASC = ascending, use "DESC" for reverse
    });
    res.json(wells);
  } catch (error) {
    console.error("Error fetching wells:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/", async (req, res) => {
  const well = await Well.create(req.body);
  res.json(well);
});

router.patch("/:id", async (req, res) => {
  try {
    console.log(req.body)
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const [updated] = await Well.update(
      { status },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Well not found" });
    }

    return res.json({ message: "Well updated successfully" });
  } catch (error) {
    console.error("Error updating well:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
