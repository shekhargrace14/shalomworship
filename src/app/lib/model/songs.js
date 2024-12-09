import mongoose from "mongoose";
const songModel = new mongoose.Schema({
    title:String,
    image:String,
    content:String,
})
export const Song = mongoose.models.songs || mongoose.model("songs",songModel)