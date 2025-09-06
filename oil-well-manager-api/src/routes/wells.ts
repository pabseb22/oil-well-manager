import { Router } from "express";
import { getAllWells, createWell, updateWellStatus } from "../controllers/wellController";

const router = Router();

router.get("/", getAllWells);
router.post("/", createWell);
router.patch("/:id", updateWellStatus);

export default router;
