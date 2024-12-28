import { renderCards } from "../../utils/cards.js";
import { updateHeader } from "../../utils/globals.js";
import { getArtist, getItems, setItems } from "../../utils/globals.js";
import { editItem } from "../artistAddNewItemPage/artistAddNewItemPage.js";
import { resetEditingItem } from "../artistAddNewItemPage/artistAddNewItemPage.js";

const addNewItemDiv = document.querySelector(".add-new-item-div");
const cardsContainer = document.querySelector(
	"#artistItemsPage .cards-container"
);

let itemsList = getItems();
let artistItems;

export function initArtistItemsPage() {
	const currentArtist = getArtist();
	updateHeader("artist");

	itemsList = getItems();

	artistItems = itemsList.filter((item) => item.artist === currentArtist);
	console.log("Filtered items for artist:", artistItems);
	renderCards(artistItems, "artist");

	addNewItemDiv.addEventListener("click", () => {
		console.log("addNewItemDiv clicked");
		resetEditingItem();
		location.hash = "#artistAddNewItemPage";
	});

	function removeItem(id) {
		itemsList = getItems();
		console.log("Removing item with id:", id);

		artistItems = artistItems.filter((item) => String(item.id) !== id);

		itemsList = itemsList.filter((item) => String(item.id) !== id);
		setItems(itemsList);

		renderCards(artistItems, "artist");
	}

	function togglePublish(id) {
		itemsList = getItems();
		artistItems = artistItems.map((item) => {
			if (String(item.id) === id) {
				item.isPublished = !item.isPublished;
			}
			return item;
		});

		// Update the itemsList to reflect the changes
		itemsList = itemsList.map((item) =>
			String(item.id) === id
				? artistItems.find((i) => String(i.id) === id)
				: item
		);
		setItems(itemsList);
		renderCards(artistItems, "artist");
	}

	cardsContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("edit-btn")) {
			editItem(event.target.dataset.id);
			location.hash = "#artistAddNewItemPage";
		} else if (event.target.classList.contains("remove-btn")) {
			const answer = confirm("Are you sure you want to remove this item?");
			if (answer) {
				removeItem(event.target.dataset.id);
			}
			event.stopImmediatePropagation();
		} else if (event.target.classList.contains("toggle-publish-btn")) {
			togglePublish(event.target.dataset.id);
			event.stopImmediatePropagation();
		}
	});
}
