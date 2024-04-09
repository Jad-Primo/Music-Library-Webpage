document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('customTitleField');
  const resultsTitle = document.getElementById('customSearchResultsTitle');
  const resultsBody = document.getElementById('customSearchResultsBody');
  const submitButton = document.getElementById('customSubmitButton');
  const playlist = document.getElementById('customPlaylistBody');

  // Trigger submit on Enter key press in the title input field
  titleInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitButton.click();
    }
  });

  // Submit button event listener
  submitButton.addEventListener('click', () => {
    const title = titleInput.value;               // Get the song title from the input field
    if (!title) {                                 // Check if it's empty                
      alert('Please enter a song title.');        // If so, notify the user and exit
      return;
    }
    updateResults(title);                         // Otherwise, update the search results    
  });

  // Function to update search results
  const updateResults = async (title) => {
    resultsTitle.textContent = `Songs Matching: ${title}`;  // Update the results title
    try {
      const songs = await fetchSongs(title);                // Fetch the songs based on the provided title
      displayResults(songs.results);                        // Display the results
    } catch (error) {                                       // Log an error if one occurs
      console.error('Error fetching songs:', error);
    }
  };

  // Function to fetch songs from the server
  const fetchSongs = async (title) => {                       
    const response = await fetch(`/songs?title=${title}`);    // Fetch to the server with the provided title
    return response.json();                                   // Return the response as JSON
  };

  // Function to display search results
  const displayResults = (songs) => {
    resultsBody.innerHTML = '';                         // Clear the current results  
    
    // For each song, create a row in the table with the song data
    songs.forEach(song => {         
      const row = resultsBody.insertRow();           // Insert a new row
      row.innerHTML = `
        <td><button class="add-to-playlist">+</button></td>
        <td>${song.trackName}</td>
        <td>${song.artistName}</td>
        <td><img src="${song.artworkUrl100}" alt="Artwork"></td>
      `;

      // Add a listener for the add button and add the song if clicked
      row.querySelector('.add-to-playlist').addEventListener('click', () => {
        addToPlaylist(song);
      });
    });
  };

  // Function to add a song to the playlist
  const addToPlaylist = (song) => {
    const row = playlist.insertRow();          // Insert a new row

    // Modify the row cells with the song data and options to add/move
    row.innerHTML = `
      <td>
        <button class="remove-from-playlist">-</button>
        <button class="move-up">🔼</button>
        <button class="move-down">🔽</button>
      </td>
      <td>${song.trackName}</td>
      <td>${song.artistName}</td>
      <td><img src="${song.artworkUrl100}" alt="Artwork"></td>
    `;

    // Add a listener to remove from playlist and table logic when triggered
    row.querySelector('.remove-from-playlist').addEventListener('click', () => {
      row.remove();
      updateLocalStorage();
    });

    // Add a listener to move up in playlist and table logic when triggered
    row.querySelector('.move-up').addEventListener('click', () => {
      moveRow(row, -2);
      updateLocalStorage();
    });

    // Add a listener to move down in playlist and table logic when triggered
    row.querySelector('.move-down').addEventListener('click', () => {
      moveRow(row, 1);
      updateLocalStorage();
    });

    updateLocalStorage();
  };

  // Function to move a song up or down in the playlist
  const moveRow = (row, direction) => {
    const index = row.rowIndex;                    // Get the current row index

    // Check if the row can be moved
    if ((direction === -2 && index > 1) || (direction === 1 && index < playlist.rows.length)) {

      // Calculate the new index and insert the row at the new index
      playlist.insertBefore(row, playlist.rows[index + direction]);
    }
  };

  // Function to update the playlist in local storage
  const updateLocalStorage = () => {

    // Create an object with the playlist data
    const playlistData = {
      songs: [],                                // Array to hold the songs
      timestamp: new Date().getTime()           // Current time in milliseconds        
    };

    // For each song in the playlist, add the song data to the array
    for (let i = 0; i < playlist.rows.length; i++) {
      const row = playlist.rows[i];
      const songData = {
        trackName: row.cells[1].textContent,
        artistName: row.cells[2].textContent,
        artworkUrl100: row.cells[3].querySelector('img').src
      };
      playlistData.songs.push(songData);      // Add the song data to the array
    }

    // Store the playlist data in local storage
    localStorage.setItem('playlist', JSON.stringify(playlistData)); 
  };

  // Function to check if the stored playlist is expired
  const isPlaylistExpired = (timestamp) => {
    const expiryPeriod = 86400000; // 24 hours in milliseconds

    // Check if the current time is greater than the timestamp plus the expiry period 
    return new Date().getTime() - timestamp > expiryPeriod;
  };

  // Function to load the playlist from local storage
  const loadPlaylistFromLocalStorage = () => {

    // Get the playlist data from local storage
    const savedData = JSON.parse(localStorage.getItem('playlist'));

    // If there is saved data and the playlist is not expired, add the songs to the playlist
    if (savedData && !isPlaylistExpired(savedData.timestamp)) {
      savedData.songs.forEach(song => addToPlaylist(song));

    // Otherwise, remove the playlist from local storage
    } else {
      localStorage.removeItem('playlist');
    }
  };

  // Load the playlist from local storage when the page is loaded
  loadPlaylistFromLocalStorage();
});