// Testing for Accuracy of Lyrics and way its displayed
import song from "../api/data/songs/LOOM_2_Nice_to_Meet_You.json" assert { type: "json" }

function output(lyrics){
    for (let i = 0; i < lyrics.length; i++) {
        const element = lyrics[i];
        console.log(`\n${element}`)
    }
}

output(song.lyrics)