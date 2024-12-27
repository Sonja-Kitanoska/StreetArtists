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

	// addNewItemDiv.replaceWith(addNewItemDiv.cloneNode(true));
	// const newAddNewItemDiv = document.querySelector(".add-new-item-div");
	// newAddNewItemDiv.addEventListener("click", () => {
	// 	console.log("addNewItemDiv clicked");
	// 	location.hash = "#artistAddNewItemPage";
	// });

	function removeItem(id) {
		itemsList = getItems();
		console.log("Removing item with id:", id);

		artistItems = artistItems.filter((item) => String(item.id) !== id);

		itemsList = itemsList.filter((item) => String(item.id) !== id);
		setItems(itemsList);

		renderCards(artistItems, "artist");
	}

	// const editButtons = document.querySelectorAll(".edit-btn");
	// editButtons.forEach((button) => {
	// 	button.addEventListener("click", (e) => {
	// 		const id = e.target.dataset.id;
	// 		location.hash = "#artistAddNewItemPage";
	// 		editItem(id);
	// 	});
	// });

	// const removeButtons = document.querySelectorAll(".remove-btn");
	// removeButtons.forEach((button) => {
	// 	button.addEventListener("click", (e) => {
	// 		const id = e.target.dataset.id;
	// 		removeItem(id);
	// 	});
	// });

	cardsContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("edit-btn")) {
			editItem(event.target.dataset.id);
			location.hash = "#artistAddNewItemPage";
		} else if (event.target.classList.contains("remove-btn")) {
			removeItem(event.target.dataset.id);
		}
	});
}
