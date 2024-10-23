import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const existingLike = await Like.findOne({
        user: req.user._id,
        entityId: videoId,
        entityType: "video"
    });

    if (existingLike) {
        // Unlike

        await existingLike.remove();
        return res.status(200).json(new ApiResponse(200, {}, "Video Like removed successfully"))
    } else {
        // Like

        const like = await Like.create({
            user: req.user._id,
            entityId: videoId,
            entityType: "video"
        });
        return res.status(201).json(new ApiResponse(201, {like}, "VideoLike created successfully"))
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    const existingLike = await Like.findOne({
        user: req.user._id,
        entityId: commentId,
        entityType: "comment"
    });

    if (existingLike) {
        // Unlike

        await existingLike.remove();
        return res.status(200).json(new ApiResponse(200, {}, "Comment Like removed successfully"))
    } else {
        // Like

        const like = await Like.create({
            user: req.user._id,
            entityId: commentId,
            entityType: "comment"
        });
        return res.status(201).json(new ApiResponse(201, {like}, "Comment Like created successfully"))
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    const existingLike = await Like.findOne({
        user: req.user._id,
        entityId: tweetId,
        entityType: "tweet"
    });

    if (existingLike) {
        // Unlike

        await existingLike.remove();
        return res.status(200).json(new ApiResponse(200, {}, "Tweet Like removed successfully"))
    } else {
        // Like

        const like = await Like.create({
            user: req.user._id,
            entityId: tweetId,  
            entityType: "tweet"
        }); 
        return res.status(201).json(new ApiResponse(201, {like}, "Tweet Like created successfully"))
    }
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likeVideos = await Like.find({
        user: req.user._id,
        entityType: "video"
    }).populate("entityId");  // Assuming entityId is populated with video details

    return res.status(200).json(new ApiResponse(200, {likeVideos}, "Liked videos fetched successfully"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}