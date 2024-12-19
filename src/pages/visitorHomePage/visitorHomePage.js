import { getArtist } from "../../utils/globals.js"

export function initVisitorHomePage() {
    console.log('visitorHomePage')

    const currentArtist = getArtist()

    console.log(currentArtist) //
}