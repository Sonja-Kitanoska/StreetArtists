import { updateHeader, getItems } from "../../utils/globals.js";

// Select the section container
const artistAddNewItemPage = document.querySelector("#artistAddNewItemPage");

// Select all inputs within the section
const isPublishedCheckbox = artistAddNewItemPage.querySelector(
	"#isPublishedCheckbox"
);

const titleInput = artistAddNewItemPage.querySelector("#title");
const descriptionTextarea = artistAddNewItemPage.querySelector("#description");
const typeInput = artistAddNewItemPage.querySelectorAll("#type");
const priceInput = artistAddNewItemPage.querySelectorAll("#price");
const imageUrlInput = artistAddNewItemPage.querySelectorAll("#imageUrl");

export function initArtistAddNewItemPage() {
	updateHeader("artist");
	let itemsList = getItems();
}
