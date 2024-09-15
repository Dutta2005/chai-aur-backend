import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password andd resfresh token field from response
    // check for user creation
    // send response


    const { username, email, password, fullname } = req.body
    console.log("email: ", email);

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (existedUser) {  
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar) {  
        throw new ApiError(400, "Failed to upload avatar")
   }


    const user = await User.create({
        username: username.tolowerCase(),
        email,
        password,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
   })

   const createdUser = await User.findById(user._id).select("-password -refreshToken")

   if (!createdUser) {  
        throw new ApiError(500, "Something went wrong while creating user")
   }

   return res.status(201).json(
       new ApiResponse(201, "User created successfully", {
           user: createdUser
       })
   )
})  
    

export { registerUser }