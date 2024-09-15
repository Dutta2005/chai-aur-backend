// require('dotenv').config({path: './env'})
import dotenv, {config} from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({ path: "./.env" });


connectDB()
.then(() => {
    console.log("MongoDB Connected!! DataBase HOST: ", process.env.MONGODB_URI);
    app.on("error", (error) => {
        console.error("ERROR: ", error);
        throw error
    })
})
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        
        console.log(`🚀 Server is running on : ${process.env.PORT || 8000}`)
    })
})
.catch((err) => {
    console.error("MONGODB CONNECTION ERROR: ", err);
})





/*
import express from "express";
const app = express()


( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.error("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => console.log(`🚀 Server is running on : ${process.env.PORT}`))
    } catch(error){
        console.error("ERROR: ", error);
        throw error
        
    }
})()

*/