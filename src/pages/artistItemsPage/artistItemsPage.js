import { renderCards } from "../../utils/cards.js";
import { updateHeader } from "../../utils/globals.js";
import { getArtist, getItems } from "../../utils/globals.js";
import { editItem } from "../artistAddNewItemPage/artistAddNewItemPage.js";

const addNewItemDiv = document.querySelector(".add-new-item-div");
const cardsContainer = document.querySelector(
	"#artistItemsPage .cards-container"
);

let itemsList = getItems();

export function initArtistItemsPage() {
	const currentArtist = getArtist();
	updateHeader("artist");

	itemsList = getItems();

	const artistItems = itemsList.filter((item) => item.artist === currentArtist);
	console.log("Filtered items for artist:", artistItems);
	renderCards(artistItems, "artist");

	addNewItemDiv.addEventListener("click", () => {
		console.log("addNewItemDiv clicked");
		location.hash = "#artistAddNewItemPage";
	});

	cardsContainer.addEventListener(
		"click",
		(event) => {
			if (event.target.classList.contains("edit-btn")) {
				editItem(event.target.dataset.id);
				location.hash = "#artistAddNewItemPage";
			}
		},
		{ once: true }
	);
}
