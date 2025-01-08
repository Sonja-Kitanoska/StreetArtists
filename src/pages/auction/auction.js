import {
	getItems,
	getAuctionTimer,
	setAuctionTimer,
	getRole,
	setItems,
	getArtist,
} from "../../utils/globals.js";
import { updateHeader } from "../../utils/header.js";

const confirmBidBtn = document.querySelector("#confirmBid");
const auctionImage = document.querySelector("#auctionImg");
const auctionArtistName = document.querySelector("#auctionArtistName");
const auctionInitialPrice = document.querySelector("#auctionInitialPrice");
const auctionTitle = document.querySelector("#auctionTitle");
const auctionDescription = document.querySelector("#auctionDescription");
const timer = document.querySelector("#timerSpan");
const bidsVisitorContainer = document.querySelector("#bidsVisitorContainer");
const bidsArtistContainer = document.querySelector("#bidsArtistContainer");

let remainingTime = getAuctionTimer();
let timerInterval = null;
let currentBid;
let lastBid = parseFloat(localStorage.getItem("lastBid")) || 0;

export function initAuction() {
	updateHeader("visitor");
	const itemsList = getItems();
	let role = getRole();
	let currentArtist = getArtist();

	if (role === "artist") {
		bidsVisitorContainer.classList.add("d-none");
		bidsArtistContainer.classList.remove("d-none");
	} else if (role === "visitor") {
		bidsArtistContainer.classList.add("d-none");
		bidsVisitorContainer.classList.remove("d-none");
	}

	// NO AUCTION MESSAGE
	const filteredItems = itemsList.filter((item) => item.isAuctioning === true);
	const bidding = document.querySelector(".bidding");
	const noAuctionMessage = document.querySelector("#noAuctionMessage");

	if (filteredItems.length === 0) {
		bidding.classList.add("hidden");
		if (noAuctionMessage) {
			noAuctionMessage.classList.remove("hidden");
		}
	} else {
		bidding.classList.remove("hidden");
		noAuctionMessage.classList.add("hidden");
	}

	// DIFFERENT BUTTON FOR ARTISTS
	initializeRoleBasedUI(role);

	const auctionItem = itemsList.find((item) => item.isAuctioning);
	if (auctionItem) {
		const { image, artist, price, title, description } = auctionItem;

		auctionImage.src = image;
		auctionArtistName.textContent = artist;
		auctionInitialPrice.textContent = `$ ${price / 2}`;
		auctionTitle.textContent = title;
		auctionDescription.textContent = description;
	}

	restoreBidMessages(role);

	currentBid = auctionInitialPrice.textContent.slice(2);

	const bidsList = [];
	let isAuctionOver = false;

	const auctionState = JSON.parse(localStorage.getItem("auctionOver"));
	if (auctionState && auctionState.finalBid) {
		isAuctionOver = true;
		restoreBidMessages(role);
	} else {
		restoreBidMessages(role);
	}

	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = null;
	}

	remainingTime = getAuctionTimer();
	if (!remainingTime || isAuctionOver) {
		remainingTime = 120;
		setAuctionTimer(remainingTime);
		isAuctionOver = false;
	}

	confirmBidBtn.removeEventListener("click", handleBid);
	confirmBidBtn.addEventListener("click", handleBid);

	async function handleBid(event) {
		event.preventDefault();
		console.log("clicked");
		if (confirmBidBtn.disabled) return;

		if (isAuctionOver) {
			alert("The auction is over. No further bids are allowed.");
			return;
		}

		confirmBidBtn.disabled = true;

		const bidAmountInput = document.querySelector("#bidAmount");
		const bidAmount = parseFloat(bidAmountInput.value);

		if (isNaN(bidAmount) || bidAmount <= lastBid || bidAmount <= currentBid) {
			const errMessage = document.querySelector(".err-message");
			errMessage.classList.remove("d-none");
			bidAmountInput.value = "";
			confirmBidBtn.disabled = false;
			setTimeout(() => {
				errMessage.classList.add("d-none");
			}, 1500);
			return;
		}

		try {
			const formData = new FormData();
			formData.append("amount", bidAmount);

			const response = await fetch(
				"https://projects.brainster.tech/bidding/api",
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error("Failed to place the bid. Please try again.");
			}

			const data = await response.json();

			if (data) {
				if (data.isBidding) {
					const upBid = data.bidAmount;
					currentBid = upBid;
					bidsList.push(upBid);
					lastBid = upBid;
					localStorage.setItem("lastBid", lastBid);
					console.log("last bid", lastBid);
					console.log("current bid", currentBid);

					addBidMessage(`Someone is bidding $${upBid}.`, "artist");
					addBidMessage(
						`Someone else is bidding $${upBid}. Apply higher amount if you want to continue bidding`,
						"visitor"
					);

					resetAuctionTimer();
				} else {
					const userBid = parseFloat(bidAmount);
					if (bidsList.length === 0) {
						lastBid = userBid;
					}
					bidsList.push(userBid);
					currentBid = userBid;
					lastBid = userBid;
					localStorage.setItem("lastBid", lastBid);
					console.log("last bid", lastBid);
					console.log("current bid", currentBid);

					addBidMessage(`A bid of $${userBid} has been recorded.`, "artist");
					addBidMessage(
						`Your bid of $${userBid} has been successfully placed.`,
						"visitor"
					);
				}
				bidAmountInput.value = "";
			} else {
				console.error("Unexpected response from the server:", data);
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			confirmBidBtn.disabled = false;
		}
	}

	function startAuctionTimer() {
		remainingTime = getAuctionTimer();

		updateTimerDisplay();

		if (timerInterval) {
			clearInterval(timerInterval);
		}

		timerInterval = setInterval(() => {
			if (remainingTime > 0) {
				remainingTime--;
				setAuctionTimer(remainingTime);
			} else {
				clearInterval(timerInterval);
				endAuction();
				auctionItem.isAuctioning = false;
				auctionItem.priceSold = lastBid;
				auctionItem.dateSold = new Date().toISOString();
				setItems(itemsList);
				stopAuctionTimer();
			}

			updateTimerDisplay();
		}, 1000);
	}

	function updateTimerDisplay() {
		const minutes = Math.floor(remainingTime / 60);
		const seconds = remainingTime % 60;
		timer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	}

	function resetAuctionTimer() {
		remainingTime = 120;
		setAuctionTimer(remainingTime);
		updateTimerDisplay();
		startAuctionTimer();
	}

	function addBidMessage(message, role) {
		const bidsVisitorContainer = document.querySelector(
			"#bidsVisitorContainer"
		);
		const bidsArtistContainer = document.querySelector("#bidsArtistContainer");
		const li = document.createElement("li");
		li.innerHTML = message;

		if (role === "artist") {
			bidsArtistContainer.appendChild(li);
		} else if (role === "visitor") {
			bidsVisitorContainer.appendChild(li);
		}

		let storedBids = JSON.parse(localStorage.getItem("bids")) || [];
		storedBids.push({ message, role });
		localStorage.setItem("bids", JSON.stringify(storedBids));
	}

	function restoreBidMessages(role) {
		const bidsVisitorContainer = document.querySelector(
			"#bidsVisitorContainer"
		);
		const bidsArtistContainer = document.querySelector("#bidsArtistContainer");
		bidsArtistContainer.innerHTML = "";
		bidsVisitorContainer.innerHTML = "";

		const storedBids = JSON.parse(localStorage.getItem("bids")) || [];
		storedBids.forEach(({ message, role: storedRole }) => {
			const li = document.createElement("li");
			li.innerHTML = message;
			if (storedRole === "artist") {
				bidsArtistContainer.appendChild(li);
			} else if (storedRole === "visitor") {
				bidsVisitorContainer.appendChild(li);
			}
		});

		const auctionState = JSON.parse(localStorage.getItem("auctionOver"));
		console.log(auctionState);
		if (auctionState && auctionState.finalBid) {
			const auctionEndMessage = document.createElement("p");
			auctionEndMessage.classList.add("itemSold");
			auctionEndMessage.textContent = `Auction is over. Item sold for $${auctionState.finalBid}.`;
			bidsArtistContainer.appendChild(auctionEndMessage);
			bidsVisitorContainer.appendChild(auctionEndMessage);

			isAuctionOver = true;
		}
	}

	function endAuction() {
		const bidsArtistContainer = document.querySelector("#bidsArtistContainer");
		const bidsVisitorContainer = document.querySelector(
			"#bidsVisitorContainer"
		);
		const bidsList = document.querySelector("#bidsList");
		isAuctionOver = true;
		stopAuctionTimer();

		const finalBid = lastBid > 0 ? lastBid : 0;
		const auctionOverState = { finalBid };
		localStorage.setItem("auctionOver", JSON.stringify(auctionOverState));
		console.log("auctionOver state set:", auctionOverState);

		let auctionEndMessage;

		if (finalBid) {
			auctionEndMessage = `Auction is over. Item sold for $${finalBid}.`;
		} else {
			auctionEndMessage = `Auction unsuccessful.`;
		}

		const artistMessageElement = document.createElement("p");
		artistMessageElement.classList.add("itemSold");
		if (auctionItem.artist === currentArtist) {
			artistMessageElement.textContent = `Congratulations. Your artwork is sold for $${finalBid}.`;
		} else {
			artistMessageElement.textContent = auctionEndMessage;
		}

		bidsArtistContainer.appendChild(artistMessageElement);

		const visitorMessageElement = document.createElement("p");
		visitorMessageElement.classList.add("itemSold");
		visitorMessageElement.textContent = auctionEndMessage;
		bidsVisitorContainer.appendChild(visitorMessageElement);

		bidsList.classList.add("shake");

		setTimeout(() => {
			bidsList.classList.remove("shake");
		}, 500);

		if (auctionItem) {
			auctionItem.isAuctioning = false;
			auctionItem.priceSold = finalBid;
			auctionItem.dateSold = new Date().toISOString();

			setItems(itemsList);
		}

		localStorage.removeItem("lastBid");
		localStorage.removeItem("bids");
		localStorage.removeItem("auctionOver");
	}

	function stopAuctionTimer() {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	}
	if (auctionItem) {
		startAuctionTimer();
	}
}

function initializeRoleBasedUI(role) {
	const isArtist = role === "artist";

	confirmBidBtn.disabled = isArtist;
	confirmBidBtn.style.cursor = isArtist ? "not-allowed" : "pointer";

	if (isArtist) {
		confirmBidBtn.textContent = "Bidding Disabled for Artists";
		bidsArtistContainer.classList.remove("d-none");
	} else {
		confirmBidBtn.textContent = "Confirm Bid";
		bidsVisitorContainer.classList.remove("d-none");
	}
}
