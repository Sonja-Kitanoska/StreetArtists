import { items } from "../../data/db.js";

let currentArtist;
let itemsList;
let remainingTime = 120;
let role;
let capturedImageUrl;

//ARTIST
export function getArtist() {
	const currentArtist = localStorage.getItem("currentArtist");
	return currentArtist;
}

export function setArtist(selectedArtist) {
	currentArtist = selectedArtist;
	localStorage.setItem("currentArtist", currentArtist);
}

//ITEMS
const storedItems = localStorage.getItem("items");
itemsList = storedItems ? JSON.parse(storedItems) : items;
setItems(itemsList);

export function getItems() {
	const itemsList = localStorage.getItem("items");
	return JSON.parse(itemsList);
}

export function setItems(items) {
	itemsList = items;
	localStorage.setItem("items", JSON.stringify(itemsList));
}

//AUCTION
export function getAuctionTimer() {
	const savedTime = localStorage.getItem("auctionTimer");
	return savedTime !== null ? parseInt(savedTime, 10) : remainingTime; // Default to 120 if not set
}

export function setAuctionTimer(time) {
	localStorage.setItem("auctionTimer", time);
	remainingTime = time;
}

// ROLE
export function getRole() {
	const role = localStorage.getItem("role");
	return role;
}

export function setRole(selectedRole) {
	role = selectedRole;
	localStorage.setItem("role", role);
}

// CAPTURED URL
export function getCapturedUrl() {
	return capturedImageUrl;
}

export function setCapturedImageUrl(url) {
	capturedImageUrl = url;
}
