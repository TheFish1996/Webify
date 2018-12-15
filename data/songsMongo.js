//import { builtinModules } from "module";

const collections = require("../config/mongoCollections");
const SharedSongs = collections.SharedSongs;
const uuid = require("node-uuid");

//add a song to the database
async function addSong(
  user,
  Profile_Picture,
  comment,
  category,
  Artist_Name,
  song_name,
  Album_Cover,
  Stream_Url
) {
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
        UserID: user
      }
    ]
  };

  const songCollection = await SharedSongs();
  const insertSharedSong = await songCollection.insertOne(newSongSchema);
  if (insertSharedSong.insertedCount === 0) throw "Could not add shared song";
  let newId = insertSharedSong.insertedId;
  return await returnSong(newId);
}

const getAllSharedSongs = async () => {
  try {
    const collection = await SharedSongs();
    return (allSharedSongs = collection.find({}).toArray());
  } catch (e) {
    throw e;
  }
};

async function appendComment(postId, user, comment) {
  const appendModel = {
    commentId: uuid(),
    Text: comment,
    UserID: user
  };
  const commentData = await returnSong(postId); //this will get the cue data based on videoId (the primary key)
  const appendedComment = commentData.Comments.push(appendModel); //this will push a new object onto the array of objects found in key "cues"
  //console.log(commentData);
  const songCollection = await SharedSongs(); //make a reference to the collection

  //UPDATE the cue model in mongo with the data that was adjusted to it above!
  const updatedComments = await songCollection.updateOne(
    { _id: postId },
    { $set: commentData }
  );
  if (updatedComments.insertedCount === 0) console.log("Could not update the cue");
  //throw an err
  else if (updatedComments.modifiedCount === 1) return commentData; //return the cue
}

async function returnSong(id) {
  const songCollection = await SharedSongs();
  const foundSong = await songCollection.findOne({ _id: id }); //mongo query to get the cue
  if (foundSong === null) throw "could not find that cue"; //throw an err
  return foundSong; //return said cue
}

const getSpecificCategory = async (categoryProvided) => {

  const songCollection = await SharedSongs();
  const foundSongs = await songCollection.find({Category : categoryProvided }).toArray(); //mongo query to get the cue
  if (foundSongs === null) throw "could not find that cue"; //throw an err
  return foundSongs; //return said cue

}



module.exports = {
  addSong,
  getAllSharedSongs,
  returnSong,
  appendComment,
  getSpecificCategory
};
