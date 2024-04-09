// required modules
const express = require('express')
const http = require('http')

const PORT = process.env.PORT || 3000

// create an instance of the express app
const app = express()

// Serving static files from the 'public' directory to make them accessible
app.use(express.static(__dirname + '/public'))


// Handling different routes for the root and other similar paths
app.get('/', (request, response) => { response.sendFile(__dirname + '/views/index.html') })
app.get('/index.html', (request, response) => { response.sendFile(__dirname + '/views/index.html') })
app.get('/mytunes', (request, response) => { response.sendFile(__dirname + '/views/index.html') })
app.get('/mytunes.html', (request, response) => { response.sendFile(__dirname + '/views/index.html') })

// Creating a route to search for songs based on the provided title
app.get('/songs', (request, response) => {
 
  // Extracting the song title from query
  let songTitle = request.query.title
  // Transforming the title so its compatable w/ URLs (replacing spaces with '+'
  let compatableTitle = songTitle.trim().replace(/\s/g, '+')
  
  // check if user entered a song title
  if(!songTitle) { response.json({message: 'Please enter Song Title'}); return; }

  // options for making a request to iTunes API
  const options = {
    "method": "GET",
    "hostname": "itunes.apple.com",
    "port": null,
    "path": `/search?term=${compatableTitle}&entity=musicTrack&limit=20`,
    "headers": {"useQueryString": true}
  }

  // make the request to the API
  http.request(options, function(apiResponse) {
    let songData = ''

    apiResponse.on('data', function(chunk) { songData += chunk })

    // send the resut as a JSON to the client
    apiResponse.on('end', function() { response.contentType('application/json').json(JSON.parse(songData)) })
  }).end()

})


// start sever on port 3000
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log('http://localhost:3000')
    console.log('http://localhost:3000/')
    console.log('http://localhost:3000/index.html')
    console.log(`http://localhost:3000/mytunes`)
    console.log(`http://localhost:3000/mytunes.html`)
  }
})
