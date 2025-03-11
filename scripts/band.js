// shows albums
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");

fetch(`../lyrics/Bands/${band}.json`)
  .then(response => response.json())
  .then(data => {
      document.getElementById("bandTitle").innerText = data.bandName;
      let albumsContainer = document.getElementById("albumsContainer");
      
      data.albums.forEach(album => {
          let div = document.createElement("div");
          div.innerHTML = `
              <img src="../${album.cover}">
              <a href="album.html?band=${band}&album=${album.albumName}">${album.albumName} (${album.year})</a>
          `;
          albumsContainer.appendChild(div);
      });
  });