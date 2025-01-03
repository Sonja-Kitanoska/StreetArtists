import { getArtist, updateHeader, getItems } from "../../utils/globals.js";

const last7 = document.querySelector("#last7");
const last14 = document.querySelector("#last14");
const last30 = document.querySelector("#last30");

let chartInstance;
let itemsList = getItems();
const currentArtist = getArtist();

export function initArtistHomePage() {
	const currentArtist = getArtist();
	console.log("ArtistHomePage");
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
		drawChart(7);
	});

	last14.addEventListener("click", function () {
		drawChart(14);
	});

	last30.addEventListener("click", function () {
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
}

function drawChart(daysAgo = 7) {
	const labels = generateDateLabels(daysAgo);

	const artistItems = itemsList?.filter(
		(item) => item.artist === currentArtist && item.priceSold
	);
	console.log(artistItems);

	const data = generateChartData(artistItems, labels);
	console.log(data);
	artistItems.forEach((item) => console.log(item.priceSold));

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

	console.log(labels);
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
	console.log("data: ", data);
	return data;
}
