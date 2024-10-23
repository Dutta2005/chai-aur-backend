import mongoose from "mongoose"
import {Video} from "../models/video.models.js"
import {Subscription} from "../models/subscription.models.js"
import {Like} from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const {channelId} = req.params
    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id");
    }

    // get total videos uploaded by the channel
    const totalVideos = await Video.countDocuments({user: channelId})

    // get total views of all videos by the channel
    const totalViews = await Video.aggregate([
        {
            $match: {
                user: channelId
            }
        },
        {
            $group: {
                _id: null,
                totalViews: {$sum: "$views"}
            }
        }
    ])

    // get total subscribers of the channel
    const totalSubscribers = await Subscription.countDocuments({channel: channelId})

    // get total likes of all videos by the channel
    const totalLikes = await Like.countDocuments({likedBy: channelId})

    const stats = {
        totalVideos,
        totalViews: totalViews.length > 0 ? totalViews[0].totalViews : 0,
        totalSubscribers,
        totalLikes,
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {stats}, "Channel stats fetched successfully"))
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel

    const {channelId} = req.params
    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id");
    }

    const videos = await Video.find({channel: channelId}).sort({createdAt: -1})
    return res
        .status(200)
        .json(new ApiResponse(200, {videos}, "Channel videos fetched successfully"))
})

export {
    getChannelStats, 
    getChannelVideos
    }