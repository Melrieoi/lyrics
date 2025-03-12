// shows lyrics for album.html
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");
const album = urlParams.get("album");

fetch(`../lyrics/Bands/${band}.json`)
  .then(response => response.json())
  .then(data => {
      let albumData = data.albums.find(a => a.albumName === album);
      document.getElementById("pageTitle").innerText = `${albumData.albumName} (${albumData.year})`; // Sets the page title
      document.getElementById("bandTitle").innerText = data.bandName; // Sets the h1 text
      
      let albumsContainer = document.getElementById("album");
      
      data.albums.forEach(album => {
          let ul = document.createElement("ul");
          ul.innerHTML = `
              <li id="albumName">${album.albumName} (${album.year})</li>
              `;
          albumsContainer.appendChild(ul);

          album.songs.forEach(song => {
              let li = document.createElement("li");
              li.innerHTML = `${song.songName}`;
              li.setAttribute('id', 'songName');

              let pre = document.createElement("pre");
              pre.setAttribute('id', 'lyricsModalBody');
              showLyrics((song.lyrics || "").replace(/\n/g, "<br>"));

              ul.appendChild(li);
              ul.appendChild(pre);
          });
      });



    //   let songsContainer = document.getElementById("songsContainer");
    //   albumData.songs.forEach(song => {
    //       let div = document.createElement("div");
    //       div.innerHTML = `
    //           <a href="#" onclick="showLyrics('${song.songName}', '${song.lyrics.replace(/\n/g, "<br>")}')">${song.songName}</a>
    //       `;
    //       songsContainer.appendChild(div);
  });

function showLyrics(lyrics) {
  // document.getElementById("lyricsModalTitle").innerText = title;
  document.getElementById("lyricsModalBody").innerHTML = lyrics;
  // document.getElementById("lyricsModal").style.display = "block";
}