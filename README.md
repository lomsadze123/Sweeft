# Images App

The Images app is a web application designed to search for and display images based on user queries. It provides an interactive interface for users to input search queries, view search results, and click on images to view them in a modal overlay.

## 🖼️ Screenshots

<p align="center">
  <img src="https://github.com/lomsadze123/Sweeft/assets/91826108/35c55a55-a192-4281-9b02-445e4ca982d5" alt="Image 1">
  <img src="https://github.com/lomsadze123/Sweeft/assets/91826108/6a803cf6-fe25-4747-820f-1057ab8debb0" alt="Image 2">
  <img src="https://github.com/lomsadze123/Sweeft/assets/91826108/544ad439-49a4-4afe-a52f-a58d0de8bc2b" alt="Image 3">
</p>

# 🚀 Features

- **Search Functionality:** Users can input search queries to find images related to their interests.
- **Image Display:** Search results are displayed as a grid of images, allowing users to easily browse through them.
- **Modal Overlay:** Clicking on an image opens it in a modal overlay, providing a larger view and additional details.
- **Infinite Scrolling:** More images are loaded as the user scrolls down the page, providing a seamless browsing experience.
- **Scroll-to-Top Button:** Users can easily return to the top of the page by clicking on a scroll-to-top button.

## 🚀 Technologies Used

- **React:** The front-end framework used for building the user interface.
- **React Context:** Used to manage global state related to the clicked image ID.
- **Intersection Observer API:** Utilized for implementing infinite scrolling functionality.
- **Throttling:** Implemented for controlling the rate of execution of search queries to prevent performance issues.

### 🔄 Scroll Handling

- **ScrollHandle Functionality:** Implemented a `scrollHandle` function that efficiently manages scroll events, adjusting the appearance and behavior of the header based on the user's scrolling actions.

```javascript
const scrollHandle = () => {
  window.addEventListener("scroll", throttledHandleScroll);
};
```

## 🛠️ Tools & Platforms

- **:octocat: GitHub:** Version control and collaboration platform for managing project source code.
- **:shell: Git Bash:** Command-line interface for Git on Windows, used for version control and repository management.

## 📂 Project Structure

```plaintext
sweeft
├── components
│   ├── images
│   ├── modal
│   └── other-components
├── context
│   └── click-context
├── hooks
│   ├── fetch
│   └── other-hooks
└── types
    └── Types.ts
```

The project follows a modular structure to maintain clarity and scalability:

- **`components/:`** Contains React components responsible for rendering different parts of the application, such as images and the modal overlay.
- **`context/:`** Manages global state related to the clicked image ID using React Context.
- **`hooks/:`** Custom hooks for fetching data and implementing various functionalities.
- **`types/:`** TypeScript type definitions for ensuring type safety throughout the application.

## ✔️ Check

Before running or contributing to the Images app project, make sure to check the following:

### 🌐 Browser Compatibility

The Images app has been designed and tested to work on modern web browsers such as Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.

- 🌎 Google Chrome
- 🦊 Mozilla Firefox
- 🌐 Microsoft Edge
- 🧭 Safari

### 🖥️ System Requirements

Ensure that your development environment meets the following requirements:

- [![Node.js](https://img.shields.io/badge/Node.js-informational?style=flat&logo=node.js&logoColor=white&color=339933)](https://nodejs.org/) **Node.js:** The project requires Node.js for running the development server and managing dependencies. [official website](https://nodejs.org/).

- [![Git](https://img.shields.io/badge/Git-informational?style=flat&logo=git&logoColor=white&color=F05032)](https://git-scm.com/) **Git:** Make sure Git is installed on your system. You can download it from [git-scm.com](https://git-scm.com/).

## ⚙️ Installation

Follow these steps to set up the Images app locally:

**1. Clone the Repository:**

```bash
git clone https://github.com/lomsadze123/Sweeft.git
```

**2. Navigate to the Project Directory:**

```bash
cd sweeft

```

**3. Install dependencies:**

```bash
npm install
```

**4. Explore the Academy:**

```bash
npm run dev
```

## 🚀 View Live Demo

Visit the live demo: [Image App for sweeft](https://sweeft-marteli.netlify.app/)

## Authors

- [@lomsadze123](https://github.com/lomsadze123)

## Feedback

If you have any feedback, please reach out to us at beka.lomsadze.1@btu.edu.ge
