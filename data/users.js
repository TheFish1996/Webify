const collections = require("../config/mongoCollections");
const userData = collections.Users;
const uuid = require("node-uuid");

const addUser = async userName => {
  if (!userName) throw "No user id";

  let userObject = {
    _id: userName,
    shared_tracks: []
  };

  const userCollection = await userData();
  const addUser = await userCollection.insertOne(userObject);
  if (addUser.insertedCount === 0) throw "Could not create the recipe";
  let newId = addUser.insertedId;
  return await getUser(newId);
};

const getUser = async name => {
  if (!name) throw "No id was provided";
  const userCollection = await userData();
  const findUser = await userCollection.findOne({ _id: name });

  if (findUser === null) {
    return false;
  }

  return findUser;
};

const appendSharedSong = async (name, sharedSong) => {
  if (!name) throw "No id was provided";
  const userInformation = await getUser(name)
  const userCollection = await userData();
  const updatedList = userInformation.shared_tracks.push(sharedSong)

  console.log(userInformation)

  const updatedSharedSongs = await userCollection.updateOne(
    { _id: name },
    { $set: userInformation }
    );
    if (updatedSharedSongs.insertedCount === 0) console.log("Could not update the cue");
  //throw an err
  else if (updatedSharedSongs.modifiedCount === 1) return userInformation; //return the cue
}


module.exports = {
  addUser,
  getUser,
  appendSharedSong
};
