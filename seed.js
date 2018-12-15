const uuid = require("node-uuid");

const collections = require("./config/mongoCollections");
const SharedSongs = collections.SharedSongs;

const seedData = [
  {
    _id: uuid(),
    User: "eaki_smalls",
    User_profile_picture: "/public/img/no-profile-picture-icon.jpg",
    Shared_Commment: "YOUNG LA FLAME HE IN SICKO MODEEEEEEE",
    Category: "UsTop50",
    Artist_name: "Travis Scott",
    Song_name: "SICKO MODE",
    Album_cover_url:
      "https://i.scdn.co/image/cdca7dc20c778ada42fb18506ea1f26857f01d17",
    Stream_url: "https://open.spotify.com/embed/track/2xLMifQCjDGFmkHkpNLD9h",
    Comments: []
  },
  {
    _id: uuid(),
    User: "jojobro96",
    User_profile_picture: "/public/img/no-profile-picture-icon.jpg",
    Shared_Commment: "eeesss J BALVINN",
    Category: "GlobalViral50",
    Artist_name: "J Balvin",
    Song_name: "Reggaeton",
    Album_cover_url:
      "https://i.scdn.co/image/4996ed53171e7a6a5d5d440d917ee0ae13eed7b2",
    Stream_url: "https://open.spotify.com/embed/track/2D3z17LBMJ2HEHeBFFjTLi",
    Comments: [
      {
        commentId: uuid(),
        Text: "This aint it chief",
        UserID: "I-am-Chief"
      }
    ]
  },
  {
    _id: uuid(),
    User: "jojobro96",
    User_profile_picture: "/public/img/no-profile-picture-icon.jpg",
    Shared_Commment: "....taki, taki..ROOMBA!!",
    Category: "GlobalTop50",
    Artist_name: "DJ Snake",
    Song_name: "Taki Taki (with Selena Gomez, Ozuna & Cardi B)",
    Album_cover_url:
      "https://i.scdn.co/image/cca02c139eb4270d5e396086329c97c782c7b478",
    Stream_url: "https://open.spotify.com/embed/track/4w8niZpiMy6qz1mntFA5uM",
    Comments: [
      {
        commentId: uuid(),
        Text: "GURLLLL I knowwww",
        UserID: "Creed-Girl"
      }
    ]
  },
  {
    _id: uuid(),
    User: "eaki_smalls",
    User_profile_picture: "/public/img/no-profile-picture-icon.jpg",
    Shared_Commment: "eeesss J BALVINN",
    Category: "GlobalViral50",
    Artist_name: "J Balvin",
    Song_name: "Reggaeton",
    Album_cover_url:
      "https://i.scdn.co/image/4996ed53171e7a6a5d5d440d917ee0ae13eed7b2",
    Stream_url: "https://open.spotify.com/embed/track/2D3z17LBMJ2HEHeBFFjTLi",
    Comments: [
      {
        commentId: uuid(),
        Text: "This aint it chief",
        UserID: "I-am-Chief"
      }
    ]
  },
  {
    _id: uuid(),
    User: "jojobro96",
    User_profile_picture: "/public/img/no-profile-picture-icon.jpg",
    Shared_Commment: "....taki, taki..ROOMBA!!",
    Category: "GlobalTop50",
    Artist_name: "DJ Snake",
    Song_name: "Taki Taki (with Selena Gomez, Ozuna & Cardi B)",
    Album_cover_url:
      "https://i.scdn.co/image/cca02c139eb4270d5e396086329c97c782c7b478",
    Stream_url: "https://open.spotify.com/embed/track/4w8niZpiMy6qz1mntFA5uM",
    Comments: [
      {
        commentId: uuid(),
        Text: "Cardi's verse is crazyyy",
        UserID: "TheFan1234"
      },
      {
        commentId: uuid(),
        Text: "GURLLLL I knowwww",
        UserID: "Creed-Girl"
      }
    ]
  },
  {
    _id: uuid(),
    User: "eaki_smalls",
    User_profile_picture: "/public/img/no-profile-picture-icon.jpg",
    Shared_Commment: "..Y'all gotta watch CREED II !!",
    Category: "UnitedStatesViral50",
    Artist_name: "Mike WiLL Made-It",
    Song_name: "Shea Butter Baby (with J. Cole)",
    Album_cover_url:
      "https://i.scdn.co/image/a6a2ad66bd83833274a57dfada96a55337b5c43b",
    Stream_url: "https://open.spotify.com/embed/track/1CVAENDG5VY05pEHh0ViXL",
    Comments: [
      {
        commentId: uuid(),
        Text: "Michael B. Jordan is beautiful omg",
        UserID: "Tessa_Thompson"
      },
      {
        commentId: uuid(),
        Text: "GURLLLL I knowwww",
        UserID: "Creed-Girl"
      }
    ]
  }
];

async function seedDataBase(data) {
  const songCollection = await SharedSongs();
  const insertSharedSong = await songCollection.insertMany(data);
}

async function main() {
  let seeded = await seedDataBase(seedData);
  console.log("done..");
}
main();
