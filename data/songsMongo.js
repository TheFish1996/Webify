//import { builtinModules } from "module";

const collections = require("../config/mongoCollections");
const SharedSongs = collections.SharedSongs;
const uuid = require("node-uuid");

//add a song to the database
async function addSong (user, Profile_Picture, comment, category, Artist_Name, song_name, Album_Cover, Stream_Url) {

  let newSongSchema = {
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
        commentId: uuid(),
        Text: comment,
        UserID: user,
        Time: "2018-04-23"
      }
    ]
  };

  const songCollection = await SharedSongs();
  const insertSharedSong = await songCollection.insertOne(newSongSchema);
  if (insertSharedSong.insertedCount === 0) throw "Could not add shared song";
  let newId = insertSharedSong.insertedId;
  return await returnSong(newId);
};

const getAllSharedSongs = async () => {
  try {
    const collection = await SharedSongs();
    return (allSharedSongs = collection.find({}).toArray());
  } catch (e) {
    throw e;
  }
};

async function returnSong(id) {
  const songCollection = await SharedSongs();
  const foundSong = await songCollection.findOne({ _id: id }); //mongo query to get the cue
  if (foundSong === null) throw "could not find that cue"; //throw an err
  return foundSong; //return said cue
}

module.exports = {
  addSong,
  getAllSharedSongs,
  returnSong
};
