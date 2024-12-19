import { getArtist, updateHeader } from "../../utils/globals.js";

export function initArtistHomePage() {
	console.log("ArtistHomePage");
	updateHeader("artist");

	const currentArtist = getArtist();

	console.log(currentArtist); //

	document.querySelector("#artist").textContent = currentArtist;
}
