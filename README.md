## Webify
- A web application that allows users to browse trending songs and share them to a universal news feed for all users to listen, view, and comment their opinions!
- Built with Mongo, Node, Express, and the Spotify API.

### Prerequisites

This project works with node 8.11.3, testing on other versions has not been performed please check your version below.

```
node --version
```

This project also requires you to have MongoDB on your system.

### Installing

Make sure you have node installed on your machine. Then clone this repository, navigate to directory and perform an npm install
For example:

```
Webify YOUR-USERNAME$ npm install
```

Please reference MongoDB documentation for installation.

### Running

Seed the database with some data to see utilize core features.
```
npm test
```

When the terminal outputs `done...` exit the program.
After completion of database seed run the following in your terminal:

```
npm start
```

When the program starts, you can proceed to localhost:3000!

### How it works

Webify is a web based application that utilizes template engines, a node.JS server utilizing RESTful services from the Spotify API, and RESTful services using its own API to update it's own database. Authentication is completely handled by the Spotify API and users will need their own Spotify Account to access the application. 

Webify serves as an application for music enthusiasts to leverage their favorite parts about Twitter, and SoundCloud, and merging them into one centralized app. By having the playability of Spotify's embed, while having the community of a Twitter based application, people from across the world can find and share songs from their peers as opposed to curated playlists.

A high level overview of technical flow begins with a user registering or logging into our service with Spotify credentials. The user is then redirected to a global "newsfeed" of all songs people are sharing. The user can filter shared songs by category, or view all shared songs. They can then interact with eachother by posting comments on specific shared songs. Users can browse songs to share by exploring Spotify's viral, global, and top playlists. They can listen to it on the spot, and share it with what they think about it without the use of any third party windows, or applications. 



