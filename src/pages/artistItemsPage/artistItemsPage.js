import { renderCards } from "../../utils/cards.js";
import { updateHeader } from "../../utils/globals.js";
// import { items } from "../../../data/db.js";
import { getArtist, getItems } from "../../utils/globals.js";

const addNewItemDiv = document.querySelector(".add-new-item-div");

export function initArtistItemsPage() {
	const currentArtist = getArtist();
	const itemsList = getItems();
	updateHeader("artist");

	const artistItems = itemsList.filter((item) => item.artist === currentArtist);

	renderCards(artistItems, "artist");


	addNewItemDiv.addEventListener("click", () => {
		location.hash = "#artistAddNewItemPage";
	});
}
