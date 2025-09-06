import { Request, Response } from "express";
import { Well } from "../models/Well";

export const getAllWells = async (_: Request, res: Response) => {
	try {
		const wells = await Well.findAll({
			order: [["id", "ASC"]],
		});
		res.json(wells);
	} catch (error) {
		console.error("Error fetching wells:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const createWell = async (req: Request, res: Response) => {
	try {
		const well = await Well.create(req.body);
		res.json(well);
	} catch (error) {
		console.error("Error creating well:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateWellStatus = async (req: Request, res: Response) => {
	try {
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
};
