// shows albums for band.html
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");

//fetch(`../Bands/${band}.json`) // for local use
fetch(`../lyrics/Bands/${band}.json`) // for github use
    .then(response => response.json())
    .then(data => {
        document.getElementById("pageTitle").innerText = data.bandName; // Sets the page title
        document.getElementById("bandTitle").innerText = data.bandName; // Sets the h1 text

        let albumsContainer = document.getElementById("albumContainer");
      
        data.albums.forEach(album => {
            let div = document.createElement("div");
            div.setAttribute('id', 'album');

            let ul = document.createElement("ul");
            ul.innerHTML = `
                <li id="albumName"><a href="album.html?band=${band}&album=${encodeURIComponent(album.albumName)}">${album.albumName} (${album.year})</a></li>
                `;
            div.appendChild(ul);
            albumsContainer.appendChild(div);

            album.songs.forEach(song => {
                let li = document.createElement("li");
                li.innerHTML = `${song.songName}`;
                li.setAttribute('id', 'songNames');

                ul.appendChild(li);
            });
        });

        let div2 = document.getElementById("bandInfo");
        let p2 = document.createElement("p");
        p2.setAttribute('id', 'yellowBorderLeft');

        var nationality = data.info?.[0]?.nationality ?? "Undefined";
        var foundingyear = data.info?.[0]?.foundingyear ?? "Undefined";
        var bandlink = data.link ?? "Undefined";

        const fullURL = `https://${bandlink}`;

        p2.innerHTML = `
        <p>Nationality: ${nationality}</p>
        <p>Founding year: ${foundingyear}</p>
        <p>Link: <a href="${fullURL}">${bandlink}</a></p>
        `;

        div2.appendChild(p2);
    });