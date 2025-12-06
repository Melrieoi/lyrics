// shows lyrics for album.html
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");
const album = urlParams.get("album");

//fetch(`../Bands/${band}.json`) // for local use
fetch(`../lyrics/Bands/${band}.json`) // for github use
  .then(response => response.json())
  .then(data => {
      let albumData = data.albums.find(a => a.albumName === album);
      document.getElementById("pageTitle").innerText = `${albumData.albumName} (${albumData.year})`; // Sets the page title
      document.getElementById("bandTitle").innerText = data.bandName; // Sets the h1 text

      let albumsContainer = document.getElementById("album");

        let ul = document.createElement("ul");
        ul.innerHTML = `
            <li id="albumName"><a>${albumData.albumName} (${albumData.year})</a></li>
            `;
        albumsContainer.appendChild(ul);

        albumData.songs.forEach(song => {
          let li = document.createElement("li");
          li.setAttribute('id', 'songName');
          li.innerHTML = `${song.songName}`;

          let pre = document.createElement("pre");
          pre.setAttribute('id', 'lyricsModalBody');

          pre.innerHTML = (song.lyrics || "No lyrics available").replace(/\n/g, "<br>") + "<br> ";

          ul.appendChild(li);
          ul.appendChild(pre);

        });
        let reviewdiv = document.getElementById("albumReview");
        let reviewp = document.createElement("p");
        reviewp.setAttribute('id', 'yellowBorderLeft');
        
        reviewp.innerHTML = `
        <p>Score: ${albumData.score}/10</p>
        <br>
        <p id="reviewStyle">${albumData.review}</p>
        `;
        reviewdiv.appendChild(reviewp);

        let imageSrc = `../lyrics/${albumData.albumimage}`; //? `../lyrics/${albumData.albumimage}`: "../lyrics/uploads/placeholder.png";
        let albumimg = document.getElementById("albumCover");

        albumimg.innerHTML = `
        <img id="albumImg" src="${imageSrc}" alt="${data.bandName}">
        `;
  });