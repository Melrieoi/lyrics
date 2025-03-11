// shows lyrics
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");
const album = urlParams.get("album");

fetch(`../lyrics/Bands/${band}.json`)
  .then(response => response.json())
  .then(data => {
      let albumData = data.albums.find(a => a.albumName === album);
      document.getElementById("albumTitle").innerText = `${albumData.albumName} (${albumData.year})`;
      
      let songsContainer = document.getElementById("songsContainer");
      albumData.songs.forEach(song => {
      let div = document.createElement("div");
        div.innerHTML = `
        <a href="#">${song.songName}</a>
        `;
        showLyrics(song.songName, song.lyrics.replace(/\n/g, "<br>"));
        songsContainer.appendChild(div);
    });



    //   let songsContainer = document.getElementById("songsContainer");
    //   albumData.songs.forEach(song => {
    //       let div = document.createElement("div");
    //       div.innerHTML = `
    //           <a href="#" onclick="showLyrics('${song.songName}', '${song.lyrics.replace(/\n/g, "<br>")}')">${song.songName}</a>
    //       `;
    //       songsContainer.appendChild(div);
    });

function showLyrics(title, lyrics) {
    document.getElementById("lyricsModalTitle").innerText = title;
    document.getElementById("lyricsModalBody").innerHTML = lyrics;
    document.getElementById("lyricsModal").style.display = "block";
}