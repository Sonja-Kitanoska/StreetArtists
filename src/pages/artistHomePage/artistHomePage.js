import { getArtist } from "../../utils/globals.js"

export function initArtistHomePage() {
    console.log('ArtistHomePage')

    const currentArtist = getArtist()

    console.log(currentArtist) //

    document.querySelector("#artist").textContent = currentArtist
}