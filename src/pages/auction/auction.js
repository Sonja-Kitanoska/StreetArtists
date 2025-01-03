import {
	updateHeader,
	getItems,
	getAuctionTimer,
	setAuctionTimer,
	getRole,
} from "../../utils/globals.js";

const confirmBidBtn = document.querySelector("#confirmBid");
const auctionImage = document.querySelector("#auctionImg");
const auctionArtistName = document.querySelector("#auctionArtistName");
const auctionInitialPrice = document.querySelector("#auctionInitialPrice");
const auctionTitle = document.querySelector("#auctionTitle");
const auctionDescription = document.querySelector("#auctionDescription");
const timer = document.querySelector("#timerSpan");

let remainingTime = getAuctionTimer();
let timerInterval = null;
let lastBid = 0;

function initializeRoleBasedUI(role) {
	const isArtist = role === "artist";

	confirmBidBtn.disabled = isArtist;
	confirmBidBtn.style.cursor = isArtist ? "not-allowed" : "pointer";

	if (isArtist) {
		confirmBidBtn.textContent = "Bidding Disabled for Artists";
	} else {
		confirmBidBtn.textContent = "Confirm Bid";
	}
}

export function initAuction() {
	updateHeader("visitor");

	const itemsList = getItems();
	let role = getRole();
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

	restoreBidMessages();

	let currentBid = auctionInitialPrice.textContent.slice(2);

	const bidsList = [];
	let isAuctionOver = false;

	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = null;
	}

	remainingTime = getAuctionTimer();
	if (!remainingTime || isAuctionOver) {
		remainingTime = 120; // Default auction time
		setAuctionTimer(remainingTime); // Store in local storage
		isAuctionOver = false; // Reset auction state
	}

	confirmBidBtn.addEventListener("click", async (event) => {
		event.preventDefault();

		if (isAuctionOver) {
			alert("The auction is over. No further bids are allowed.");
			return;
		}

		confirmBidBtn.disabled = true;

		const bidAmountInput = document.querySelector("#bidAmount");
		const bidAmount = parseFloat(bidAmountInput.value);

		if (isNaN(bidAmount) || bidAmount <= parseFloat(currentBid)) {
			alert("Please enter a valid bid amount.");
			confirmBidBtn.disabled = false;
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

					addBidMessage(
						`Someone else is bidding $${upBid}. Add a higher amount to continue bidding.`
					);

					resetAuctionTimer();
				} else {
					bidsList.push(bidAmount);
					currentBid = bidAmount;
					lastBid = bidAmount;

					addBidMessage(`Your bid $${bidAmount} has been placed.`);
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
	});

	function startAuctionTimer() {
		remainingTime = getAuctionTimer();

		updateTimerDisplay();

		if (timerInterval) {
			clearInterval(timerInterval);
		}

		timerInterval = setInterval(() => {
			if (remainingTime > 0) {
				remainingTime--;
				setAuctionTimer(remainingTime); // Update timer in localStorage
			} else {
				clearInterval(timerInterval);
				endAuction();
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
		remainingTime = 120; // Reset to 2 minutes
		setAuctionTimer(remainingTime); // Store the reset time
		updateTimerDisplay();
		startAuctionTimer();
	}

	function addBidMessage(message) {
		const bidsContainer = document.querySelector("#bidsContainer");
		const li = document.createElement("li");
		li.innerHTML = message;
		bidsContainer.appendChild(li);

		let storedBids = JSON.parse(localStorage.getItem("bids")) || [];
		storedBids.push(message);
		localStorage.setItem("bids", JSON.stringify(storedBids));
	}

	function restoreBidMessages() {
		const bidsContainer = document.querySelector("#bidsContainer");
		const storedBids = JSON.parse(localStorage.getItem("bids")) || [];
		storedBids.forEach((message) => {
			const li = document.createElement("li");
			li.innerHTML = message;
			bidsContainer.appendChild(li);
		});
	}

	function endAuction() {
		const bidsContainer = document.querySelector("#bidsContainer");
		const bidsList = document.querySelector("#bidsList");
		isAuctionOver = true;
		stopAuctionTimer();

		const finalBid =
			currentBid > 0 ? currentBid : auctionInitialPrice.textContent.slice(2); // Fallback to initial pric

		const auctionEndMessage = document.createElement("p");
		auctionEndMessage.classList.add("itemSold");
		auctionEndMessage.textContent = `Auction is over. Item sold for $${finalBid}.`;
		bidsContainer.appendChild(auctionEndMessage);

		bidsList.classList.add("shake");

		setTimeout(() => {
			bidsList.classList.remove("shake");
		}, 500);

		// auctionItem.isAuctioning = false;
		// auctionItem.priceSold = lastBid;
		// auctionItem.dateSold = new Date();
		localStorage.removeItem("bids");
	}
	function stopAuctionTimer() {
		if (timerInterval) {
			clearInterval(timerInterval); // Clears the interval, stopping the timer
			timerInterval = null; // Reset the interval reference
		}
	}

	startAuctionTimer();
}
