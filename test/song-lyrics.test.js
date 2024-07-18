import song from "../api/data/songs/EVOLVE_1_I_Dont_know_Why.json" assert { type: "json" }

function output(lyrics){

    for (let i = 0; i < lyrics.length; i++) {
        const element = lyrics[i];
        console.log(element)
        console.log("\n")
    }
}

output(song.lyrics)