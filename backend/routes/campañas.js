import express from "express";
import { verifyToken } from "../middleware/validacionToken.js";
import campaña from "../controllers/Campañas.js";

const router = express.Router();

router.post("/create-campaign", verifyToken, campaña.create);
router.get("/get-campaign", campaña.retrieve);
router.delete("/delete-campaign", campaña.delete);

router.post("/create-campaign-registration", verifyToken, campaña.create_registration);
router.delete("/delete-registration", verifyToken, campaña.delete_registration);

export default router;