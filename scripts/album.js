// shows lyrics for album.html
// const urlParams = new URLSearchParams(window.location.search);
// const band = urlParams.get("band");
// const album = urlParams.get("album");

// fetch(`../lyrics/Bands/${band}.json`)
//   .then(response => response.json())
//   .then(data => {
//       let albumData = data.albums.find(a => a.albumName === album);
//       document.getElementById("pageTitle").innerText = `${albumData.albumName} (${albumData.year})`; // Sets the page title
//       document.getElementById("bandTitle").innerText = data.bandName; // Sets the h1 text

//       let albumsContainer = document.getElementById("album");

//       data.albums.forEach(album => {
//         let ul = document.createElement("ul");
//         ul.innerHTML = `
//             <li id="albumName"><a>${album.albumName} (${album.year})</a></li>
//             `;
//         albumsContainer.appendChild(ul);

//         albumData.songs.forEach(song => {
//           let li = document.createElement("li");
//           li.innerHTML = `${song.songName}`;
//           li.setAttribute('id', 'songName');

//           let pre = document.createElement("pre");
//           pre.setAttribute('id', 'lyricsModalBody');

//           pre.innerHTML = (song.lyrics || "No lyrics available").replace(/\n/g, "<br>") + "<br> ";

//           ul.appendChild(li);
//           ul.appendChild(pre);
//         });
//       });
//   });

// shows lyrics for album.html
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");
const album = urlParams.get("album");

fetch(`../lyrics/Bands/${band}.json`)
  .then(response => response.json())
  .then(data => {
      let albumData = data.albums.find(a => a.albumName === album);

      if (!albumData) {
          console.error("Album not found!");
          return;
      }

      document.getElementById("pageTitle").innerText = `${albumData.albumName} (${albumData.year})`; // Sets the page title
      document.getElementById("bandTitle").innerText = data.bandName; // Sets the h1 text
      
      let albumsContainer = document.getElementById("album");

      // Create the album section
      let ul = document.createElement("ul");
      ul.innerHTML = `
          <li id="albumName"><a>${albumData.albumName} (${albumData.year})</a></li>
      `;
      albumsContainer.appendChild(ul);

      // Loop through only this album's songs
      albumData.songs.forEach(song => {
          let li = document.createElement("li");
          li.innerHTML = `${song.songName}`;
          li.setAttribute('id', 'songName');
      
          let pre = document.createElement("pre");
          pre.setAttribute('id', 'lyricsModalBody');
          pre.innerHTML = (song.lyrics || "No lyrics available").replace(/\n/g, "<br>") + "<br> ";
      
          ul.appendChild(li);
          ul.appendChild(pre);
      });
  });