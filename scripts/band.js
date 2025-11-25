// shows albums for band.html
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");

// fetch(`../lyrics/Bands/${band}.json`) // for github
fetch(`../Bands/${band}.json`) // for localhost
    .then(response => response.json())
    .then(data => {
        document.getElementById("pageTitle").innerText = data.bandName; // Sets the page title
        document.getElementById("bandTitle").innerText = data.bandName; // Sets the h1 text
        // document.getElementById("bandFounding").innerText = data.foundingyear; // this fucks something up and makes p not show

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


                ul.appendChild(li);
            });
        });


        // let div2 = document.getElementById("bandInfo");
        // let p2 = document.createElement("p");
        // p2.innerHTML = '<p>what??? help kaas hallo?</p>';
        // div2.appendChild(p2);
    });
// <img src="../${album.cover}">
