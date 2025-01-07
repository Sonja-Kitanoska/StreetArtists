<h1 style="font-size:30px;">Street ARTists</h1>

### Table of Contents

---

1. [About the Project](#about-the-project)
2. [Tech Stack](#tech-stack)
3. [What problem does this project solve?](#what-problem-does-this-project-solve)
4. [Project Overview](#project-overview)
5. [Technical Details](#technical-details)
6. [Acknowledgments](#acknowledgments)

### About the Project

---

The goal of the StreetARTists project is to create a web platform that allows street artists to track their income, showcase their masterpieces, and engage with a global audience.

### What problem does this project solve?

---

This project helps street artists track income, expenses, and performance stats while providing professional profile pages to showcase their work and boost discoverability.

### Tech Stack

---

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

### Project Overview

---

- **Landing Page**  
  The landing page offers users the choice to join as an artist or a visitor. Artists can select from a dropdown of artists to proceed and are redirected to Artist Home Page, while visitors are redirected to the Visitor Home Page.

- **Artists Home Page**  
  Artists can view key statistics like total items sold, total income, and a live auctioning item widget. A chart visualizes sales data over different time ranges.

- **Artists Items Page**  
  Artists can manage their items here. Options to send items to auction, publish/unpublish, remove, or edit items are available. The page allows for creating new items with necessary details, including images, titles, descriptions, price, and publish status.

- **Artist Add New Item Page**  
  It provides a simple interface for artists to submit details about their new artwork, including the item’s name, description, price, and type, with an option to take a snapshot of the item for the listing.

- **Artist Capture Image Popup**  
  This popup allows artists to take a photo directly from their device’s camera and preview it. If the artist is not satisfied with the image, they can retake it by clicking on the preview to reopen the popup.

- **Visitor Home Page**  
  The Visitor Home Page features a horizontal scroll showcasing artist items, directing users to the Visitor Listing Page, while the auction icon leads to the Live Auction Page.

- **Visitor Listing Page**  
  A marketplace where visitors can browse published items from artists. Filtering options help refine searches, with each listing displaying details such as the artist’s name, description, price, and an image.

- **Visitor Filters Page**  
  Users can refine their search by selecting categories like artist name, item type, price range, and availability, making it easier for visitors to find their desired artwork.

- **Auction Page**  
  Displays a live auction where visitors can place bids. A countdown timer marks the auction duration, and when it reaches zero, the highest bidder wins the item. Artists observe, while only visitors are able to place bids.

### Technical Details

---

- The app is tailored for mobile devices, ensuring an optimal user experience on smaller screens.
- Hash routing enables fast and seamless navigation between pages without the need for full-page reloads.
- Local storage allows the live auction timers and highest bid tracking to persist even after page refreshes.

### Acknowledgments

---

     A big thanks to our instructor, Riste, for his valuable guidance during the development process. His mentorship sessions were extremely valuable, providing clear explanations and guidance that helped us stay on track and continue progressing smoothly throughout the project.
