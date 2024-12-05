import mongoose from "mongoose";
const songModel = new mongoose.Schema({
    title:String,
    image:String,
    content:Array,
})
export const Song = mongoose.models.songs || mongoose.model("songs",songModel)