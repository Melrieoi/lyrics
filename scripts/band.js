// shows albums for band.html
const urlParams = new URLSearchParams(window.location.search);
const band = urlParams.get("band");

//fetch(`../Bands/${band}.json`) // for local use
fetch(`../lyrics/Bands/${band}.json`) // for github use
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

        let div2 = document.getElementById("bandInfo");
        let p2 = document.createElement("p");
        // Works but doesn't take into account if info exists but is empty
        // if(!(data.info)){
        //     var nationality = "Undefined";
        //     var foundingyear = "Undefined";
        // } else {
        //     var nationality = data.info[0].nationality
        //     var foundingyear = data.info[0].foundingyear
        // }
        // This way aparently does take that into account
        var nationality = data.info?.[0]?.nationality ?? "Undefined";
        var foundingyear = data.info?.[0]?.foundingyear ?? "Undefined";
        var bandlink = data.link ?? "Undefined";

        p2.innerHTML = `
        <p>Nationality: ${nationality}</p>
        <p>Founding year: ${foundingyear}</p>
        <p>Link: <a href="https://${bandlink}">${bandlink}</a></p>
        `;
        // p2.innerHTML = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';
        div2.appendChild(p2);
    });
// <img src="../${album.cover}">