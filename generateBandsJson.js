const fs = require('fs');
const path = require('path');

// Path to 'Bands' folder
const bandsFolder = path.join(__dirname, 'Bands');
const outputPath = path.join(__dirname, 'bands.json');

// Read the 'Bands' folder and get all .json files
fs.readdir(bandsFolder, (err, files) => {
  if (err) {
    console.error('Error reading Bands folder:', err);
    return;
  }

  // Filter out non-JSON files
  const bandFiles = files.filter(file => file.endsWith('.json'));

  // Create an array of band objects
  const bands = bandFiles.map(file => {
    const bandData = require(path.join(bandsFolder, file));
    return {
      bandName: bandData.bandName,
      filename: file.replace('.json', ''),
      image: bandData.image
    };
  });

  // Write the bands.json file
  fs.writeFileSync(outputPath, JSON.stringify(bands, null, 2), 'utf-8');
  console.log('bands.json has been generated!');
});