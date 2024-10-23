import { Router } from "express";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// apply verifyJWT middleware to all routes
router.use(verifyJWT);

// api/v1/dashboard

router.route("/stats").get(getChannelStats)
router.route("/videos").get(getChannelVideos)


export default router