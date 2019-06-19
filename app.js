require('dotenv').config()

// pull your dependencies 
const axios = require("axios");
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const input = process.argv.slice(3).join(" ");

// node app.js find-song Freebird
if (command === "find-song") {
    // finds a song by the title given
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(data)
        // get us our general track data
        const items = data.tracks.items;
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            const songTitle = items[i].name;
            const songPreviewUrl = items[i].preview_url;
            const artistName = items[i].album.artists[0].name;
            console.log(artistName + " - " + songTitle);
            console.log("Preview URL: " + songPreviewUrl);
            console.log("------------");
        }
    });
}

// node app.js find-movie Titanic
if (command === "find-movie") {
    axios
        .get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + keys.omdbKey.apiKey)
        .then(function (response) {
            const movie = response.data;
            console.log("Movie Title: " + movie.Title);
            console.log("Actors: " + movie.Actors);
            console.log("Rotten Tomatoes Score: " + movie.Ratings[1].Value);
        })
        .catch(function (err) {
            console.log(err);
        });
}