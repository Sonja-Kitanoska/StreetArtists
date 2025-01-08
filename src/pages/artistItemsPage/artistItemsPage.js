import { renderCards } from "../../utils/cards.js";
import { updateHeader } from "../../utils/header.js";
import {
	getArtist,
	getItems,
	setItems,
	getAuctionTimer,
} from "../../utils/globals.js";
import { editItem } from "../artistAddNewItemPage/artistAddNewItemPage.js";
import { resetEditingItem } from "../artistAddNewItemPage/artistAddNewItemPage.js";
import { getCapturedUrl, setCapturedImageUrl } from "../../utils/globals.js";

const addNewItemDiv = document.querySelector(".add-new-item-div");
const cardsContainer = document.querySelector(
	"#artistItemsPage .cards-container"
);

let itemsList = getItems();
let artistItems;
let isAuctioning = false;

export function initArtistItemsPage() {
	setCapturedImageUrl("");
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

		const updatedItem = itemsList.find((item) => String(item.id) === id);
		if (updatedItem) {
			updatedItem.isPublished = !updatedItem.isPublished;
		}

		const artistItems = itemsList.filter((item) => item.artist === getArtist());

		setItems(itemsList);
		renderCards(artistItems, "artist");
	}

	function sendToAuction(id) {
		if (isAuctioning) {
			alert("An auction is already in progress!");
			return;
		}
		itemsList = getItems();

		isAuctioning = true;

		itemsList = itemsList.map((item) =>
			String(item.id) === id
				? { ...item, isAuctioning: true }
				: { ...item, isAuctioning: false }
		);

		artistItems = itemsList.filter((item) => item.artist === getArtist());

		setItems(itemsList);

		renderCards(artistItems, "artist");

		document.querySelectorAll(".auction-btn").forEach((button) => {
			if (button.dataset.id !== id) {
				button.disabled = true;
			}
		});
		location.hash = "#auction";
		console.log("Item sent to auction, auction started.");
	}

	cardsContainer.addEventListener("click", (event) => {
		console.log("Event listener triggered:", event.target);
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
		} else if (event.target.classList.contains("auction-btn")) {
			sendToAuction(event.target.dataset.id);
			event.stopImmediatePropagation();
		}
	});
}
