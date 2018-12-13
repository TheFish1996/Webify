//import { builtinModules } from "module";

const collections = require("../config/mongoCollections")
const SharedSongs = collections.SharedSongs
const uuid = require("node-uuid")


const addSong = async (user, Profile_Picture, comment, category, Artist_Name, song_name, Album_Cover, Stream_Url) => {

    let newSharedSong = {
        _id: uuid(), //unique id not pertained to song
        User: user,
        User_profile_picture: Profile_Picture,
        Shared_Commment: comment,
        Category: category,
        Artist_name: Artist_Name,
        Song_name: song_name,
        Album_cover_url: Album_Cover,
        Stream_url: Stream_Url,
        number_dailyplays: 10,
        Comments: [
          {
            _id: "e423iu2jkd",
            Text: "User comment",
            UserID: "SpotifyUsername",
            Time: "2018-04-23"
          }
        ],
        number_Comments: function() {
            return this.Comments.length;  //this doesnt work, dont know why
        },
      }

    try {
        const collection = await SharedSongs()
        const insertSharedSong =  collection.insertOne(newSharedSong)
        if (insertSharedSong.insertedCount === 0) throw "Could not add shared song";
    }
    catch (e) {
        throw e
    }
}

const getAllSharedSongs = async () => {
    try {
        const collection = await SharedSongs()
        return allSharedSongs = collection.find({}).toArray()
    }
    catch (e) {
        throw e
    }
}

const getSong = async (id) =>{ 
    try {
        const collection = await SharedSongs()
        let tasks = collection.findOne({'_id': id})
        client.close()
        return tasks
    }
    catch (e) {
        throw e
    }
}

module.exports = {
    addSong,
    getAllSharedSongs,
    getSong,
}