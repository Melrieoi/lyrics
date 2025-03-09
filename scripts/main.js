fetch("bands.json") // This file is auto-generated by CMS
  .then(response => response.json())
  .then(bands => {
      let container = document.getElementById("bandsContainer");
      bands.forEach(band => {
          let div = document.createElement("div");
          div.innerHTML = `
              <img src="${band.image}">
              <a href="Bands/band.html?band=${band.filename}">${band.bandName}</a>
          `;
          container.appendChild(div);
      });
  });