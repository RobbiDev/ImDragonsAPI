// Testing for Accuracy of Lyrics and way its displayed
import song from "../api/data/songs/EVOLVE_9_Thunder.json" assert { type: "json" }

function output(lyrics){

    for (let i = 0; i < lyrics.length; i++) {
        const element = lyrics[i];
        console.log(element)
        console.log("\n")
    }
}

output(song.lyrics)