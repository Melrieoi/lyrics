// shows albums for band.html
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");

fetch(`../lyrics/Bands/${band}.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("bandTitle").innerText = data.bandName;
        let albumsContainer = document.getElementById("album");
      
        data.albums.forEach(album => {
            let ul = document.createElement("ul");
            ul.innerHTML = `
                <li id="albumName"><a href="album.html?band=${band}&album=${album.albumName}">${album.albumName} (${album.year})</a></li>
                `;
            albumsContainer.appendChild(ul);

            let albumData = data.albums.find(a => a.albumName === album);
            albumData.songs.forEach(song => {
                let li = document.createElement("li");
                li.innerHTML = `${song.songName}`;

                ul.appendChild(li);
            });
        });
    });
// <img src="../${album.cover}">