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

export function initAuction() {
	updateHeader("visitor");

	const itemsList = getItems();

	const auctionItem = itemsList.find((item) => item.isAuctioning);

	if (auctionItem) {
		const { image, artist, price, title, description } = auctionItem;

		auctionImage.src = image;
		auctionArtistName.textContent = artist;
		auctionInitialPrice.textContent = `$ ${price / 2}`;
		auctionTitle.textContent = title;
		auctionDescription.textContent = description;
	}

	let currentBid = auctionInitialPrice.textContent.slice(2);
	let role = getRole();

	confirmBidBtn.addEventListener("click", async (event) => {
		event.preventDefault();

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
					alert(
						`Another person is bidding for the same item. You need to add an amount larger than $${upBid}.`
					);
					resetAuctionTimer();
				} else {
					alert("Your bid has been successfully placed!");
					currentBid = bidAmount;
					lastBid = bidAmount;
				}

				displayBids(data);
			} else {
				console.error("Unexpected response from the server:", data);
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			confirmBidBtn.disabled = false;
		}
	});

	function displayBids(data) {
		const bidsContainer = document.querySelector("#bidsContainer");
		const bidAmountInput = document.querySelector("#bidAmount");

		// Clear previous messages
		bidsContainer.innerHTML = "";

		const yourAmount = document.createElement("p");
		yourAmount.textContent = `Your amount is $${bidAmountInput.value}`;
		bidsContainer.appendChild(yourAmount);

		if (data.isBidding) {
			const p = document.createElement("p");
			p.textContent = `Someone else's bid is $${currentBid}. Apply a new amount if you want to continue bidding.`;
			bidsContainer.appendChild(p);
		} else {
			const itemSold = document.createElement("p");

			itemSold.textContent =
				remainingTime === 0
					? `Auction ended. Item sold for $${lastBid}.`
					: `Your bid of $${bidAmountInput.value} has been placed successfully.`;

			bidsContainer.appendChild(itemSold);
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

	function endAuction() {
		// alert("Auction ended! Item has been sold!");
		stopAuctionTimer();

		// Update item properties, for example:
		// Update item with priceSold, dateSold, isAuctioning set to false
	}
	function stopAuctionTimer() {
		if (timerInterval) {
			clearInterval(timerInterval); // Clears the interval, stopping the timer
			timerInterval = null; // Reset the interval reference
		}
		remainingTime = 120; // 120 seconds
		setAuctionTimer(remainingTime); // Save the reset time to localStorage
		updateTimerDisplay();
	}

	startAuctionTimer();
}
