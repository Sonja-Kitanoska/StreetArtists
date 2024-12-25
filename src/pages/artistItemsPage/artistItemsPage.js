import { renderCards } from "../../utils/cards.js";
import { updateHeader } from "../../utils/globals.js";
import { items } from "../../../data/db.js";
import { getArtist } from "../../utils/globals.js";

const addNewItemDiv = document.querySelector(".add-new-item-div");

export function initArtistItemsPage() {
	const currentArtist = getArtist();
	updateHeader("artist");

	const artistItems = items.filter((item) => item.artist === currentArtist);

	renderCards(artistItems, "artist");

	addNewItemDiv.addEventListener("click", () => {
		location.hash = "#artistAddNewItemPage";
	});
}
