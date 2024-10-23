import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    const filter = {};
    if (query) {
        filter.title = { $regex: query, $options: "i" };
    }

    if (userId && isValidObjectId(userId)) {
        filter.user = userId;
    }

    const videos = await Video.find(filter)
    .sort({ [sortBy]: sortType === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

    const total = await Video.countDocuments(filter);
    return res.status(200).json(new ApiResponse(200, {videos, total}, "All Videos fetched successfully"))

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    const {file} = req;
    // TODO: get video, upload to cloudinary, create video

    if (!file) {
        throw new ApiError(400, "Video is required");
    }

    // Uploading video to cloudinary
    const uploadResult = await uploadOnCloudinary(file.path, 'video');

    if (!uploadResult.url) {
        throw new ApiError(500, "Video upload failed");
    }

// Create video
    const newVideo = new Video({
        title,
        description,
        videoFile: uploadResult.secure_url,
        thumbnail: uploadResult.secure_url,
        user: req.user._id,
        cloudinaryId: uploadResult.public_id
    })

    return res.status(201).json(new ApiResponse(201, {video: newVideo}, "Video published successfully"))

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(new ApiResponse(200, {video}, "Video fetched successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body
    const { file } = req
    //TODO: update video details like title, description, thumbnail

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (file) {
        // Uploading video to cloudinary
        const uploadResult = await uploadOnCloudinary(file.path, 'image');
        video.thumbnailUrl =  uploadResult.secure_url;
    }

    video.title = title || video.title;
    video.description = description || video.description;
    await video.save();

    return res.status(200).json(new ApiResponse(200, {video}, "Video updated successfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Delete the video from cloudinary
    await cloudinary.uploader.destroy(video.cloudinaryId, {
        resource_type: "video"
    });

    // Delete the video from the database
    await video.remove();

    return res.status(200).json(new ApiResponse(200, {}, "Video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished;
    await video.save();

    return res.status(200).json(new ApiResponse(200, {video}, "Video status toggled successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}