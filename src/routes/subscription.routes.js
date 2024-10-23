import {Router} from "express";
import { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels } from "../controllers/subscription.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

// apply verifyJWT middleware to all routes
router.use(verifyJWT);

// api/v1/subscriptions

router.route("/c/:channelId").post(toggleSubscription)
router.route("/subscribers/c/:channelId").get(getUserChannelSubscribers)
router.route("/subscribed/u/:subscriberId").get(getSubscribedChannels)

export default router