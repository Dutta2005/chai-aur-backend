import { Router } from "express";
import { toggleCommentLike,  toggleTweetLike, toggleVideoLike, getLikedVideos} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

// apply verifyJWT middleware to all routes
router.use(verifyJWT);


// api/v1/likes

router.route("/toggle/v/:videoId").post(toggleVideoLike)
router.route("/toggle/t/:tweetId").post(toggleTweetLike)
router.route("/toggle/c/:commentId").post(toggleCommentLike)
router.route("/videos").get(getLikedVideos)


export default router