import {Router} from "express";
import { createTweet, getUserTweets, updateTweet, deleteTweet } from "../controllers/tweet.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

// apply verifyJWT middleware to all routes
router.use(verifyJWT);

// api/v1/tweets

router.route("/").post(createTweet)
router.route("/user/:tweetId").get(getUserTweets)
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet)

export default router