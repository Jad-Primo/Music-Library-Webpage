# Jad Hajaig

Project Overview
===========================================

This project is a simple web-based music playlist application. It allows users to search for songs, manage playlists, and interact with a Node.js server. The front-end utilizes HTML, CSS, and JavaScript, while the backend leverages Express for handling requests.
--------

Install Instructions
--------
1. Ensure Node.js and npm are installed on your system.
2. Navigate to the project directory "A4" and run `npm install` to install dependencies, including Express.

Launch Instructions
--------
1. Open Command Prompt (or the command line interpreter on your system).
2. Navigate to the project directory where `server.js` is located.
3. Type `node server.js` to start the server.

Testing Instructions
--------
URLs to test:
- `http://localhost:3000`
- `http://localhost:3000/`
- `http://localhost:3000/index.html`
- `http://localhost:3000/mytunes`
- `http://localhost:3000/mytunes.html`
--------
1. Once the server is running, open a web browser and navigate to `http://localhost:3000/index.html` or any other URL.
2. On the web page, use the text field to search for songs by entering a title and pressing Enter or clicking the Submit button.
3. Songs matching the search criteria will be displayed in the search results.
4. Test adding songs to the playlist by clicking the '+' button next to each song.
5. Test removing songs from the playlist using the '-' button, and reorder songs with the '🔼' and '🔽' buttons.
6. Refresh the browser to test if the playlist persists. Note: The playlist will be forgotten after 24 hours.
7. To shut down the server, return to the command prompt and type 'ctrl+C' or 'ctrl+D'.

File Descriptions
--------
1. `index.html`: The main HTML file for the web application.
2. `styles.css`: Contains the styling for the web application.
3. `script.js`: Contains the JavaScript logic for song search, playlist management, and local storage handling.
4. `server.js`: The Node.js server script using Express to handle song search requests and serve static files.

Note
--------
- The server is stateless and does not store any information about the playlists. All playlist data is stored on the client side using local storage.
- The playlist storage in the browser is designed to expire after 24 hours.
