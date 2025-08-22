import express from "express";
import { protect } from "../middlewares/auth.js";
import { getNearbyUbs, getUbsById } from "../controllers/ubsController.js";

const router = express.Router();

//busca Todos os UBS próximos ao usuário
router.get("/nearby", protect, getNearbyUbs);

//busca uma UBS específico pelo ID
router.get("/:id", protect, getUbsById);

export default router;
