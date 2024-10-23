import { Router } from "express";
import { getVideoComments, addComment, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// apply verifyJWT middleware to all routes
router.use(verifyJWT);

// api/v1/comments

router.route("/:videoId").get(getVideoComments)
router.route("/add/:videoId").post(addComment)
router.route("/c/:commentId").patch(updateComment).delete(deleteComment)

export default router