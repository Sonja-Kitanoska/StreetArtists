import { getArtist, getItems } from "../../utils/globals.js";
import { updateHeader } from "../../utils/header.js";

const last7 = document.querySelector("#last7");
const last14 = document.querySelector("#last14");
const last30 = document.querySelector("#last30");

let chartInstance;
let itemsList = getItems();
const currentArtist = getArtist();

export function initArtistHomePage() {
	const currentArtist = getArtist();
	updateHeader("artist");

	const publishedItems = itemsList.filter((item) => {
		return item.artist === currentArtist && item.isPublished;
	});
	const soldOutItems = publishedItems.filter((item) => item.dateSold);
	const totalItemsSold = document.querySelector(".total-items-sold");
	totalItemsSold.textContent = `${soldOutItems.length} / ${publishedItems.length}`;

	const totalPriceSold = publishedItems.reduce((accumulator, item) => {
		return accumulator + (item.priceSold || 0);
	}, 0);

	const totalIncome = document.querySelector(".total-income");
	totalIncome.textContent = `$${totalPriceSold}`;

	last7.addEventListener("click", function () {
		setActiveButton(last7);
		drawChart(7);
	});

	last14.addEventListener("click", function () {
		setActiveButton(last14);
		drawChart(14);
	});

	last30.addEventListener("click", function () {
		setActiveButton(last30);
		drawChart(30);
	});
	displayCurrentBid();
	drawChart();
}

function displayCurrentBid() {
	const currentBidElement = document.querySelector("#currentBid");

	const lastBid = localStorage.getItem("lastBid");
	currentBidElement.textContent = lastBid
		? `$${lastBid}`
		: "Currently not available";

	currentBidElement.style.cursor = "pointer";
	currentBidElement.addEventListener("click", () => {
		window.location.hash = "auction";
	});
}

function drawChart(daysAgo = 14) {
	const labels = generateDateLabels(daysAgo);

	const artistItems = itemsList?.filter(
		(item) => item.artist === currentArtist && item.priceSold
	);

	const data = generateChartData(artistItems, labels);

	if (chartInstance) {
		chartInstance.data.labels = labels;
		chartInstance.data.datasets[0].data = data;
		chartInstance.update();
	} else {
		chartInstance = initChart(labels, data);
	}
}

function generateDateLabels(daysAgo = 7) {
	const labels = [];

	for (let i = 0; i < daysAgo; i++) {
		const now = new Date();
		const offsetDate = now.setDate(now.getDate() - i);
		labels.push(formatDate(offsetDate));
	}

	return labels;
}

function formatDate(date) {
	return new Date(date).toLocaleDateString("en-GB");
}

function initChart(labels = [], data = []) {
	const ctx = document.getElementById("myChart");

	const chartInstance = new Chart(ctx, {
		type: "bar",
		data: {
			labels: labels,
			datasets: [
				{
					label: "Amount",
					data: data,
					borderWidth: 0,
					backgroundColor: "#a16a5e",
					hoverBackgroundColor: "#d44c2e",
					barThickness: 7,
				},
			],
		},
		options: {
			indexAxis: "y",
			scales: {
				y: {
					beginAtZero: true,
					grid: {
						display: false,
					},
				},
				x: {
					grid: {
						display: false,
					},
				},
			},
		},
	});

	return chartInstance;
}

function generateChartData(items = [], labels = []) {
	const data = [];
	labels.forEach((label) => {
		let sum = 0;

		items.forEach((item) => {
			if (formatDate(item.dateSold) === label) {
				sum += item.priceSold;
			}
		});

		data.push(sum);
	});

	return data;
}

function setActiveButton(clickedButton) {
	last7.classList.remove("active-btn");
	last14.classList.remove("active-btn");
	last30.classList.remove("active-btn");

	clickedButton.classList.add("active-btn");
}
