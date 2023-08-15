const usgsUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Fetch earthquake data from the USGS API
fetchData(usgsUrl)
  .then(data => {
    // Display data in console
    console.log(data);

    // Create features from the earthquake data
    const earthquakeFeatures = createFeatures(data.features);

    // Create a map with the earthquake features
    createMap(earthquakeFeatures);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

// Fetch data from a URL
function fetchData(url) {
  return fetch(url).then(response => response.json());
}

// Create features from earthquake data
function createFeatures(earthquakeData) {
  return earthquakeData.map(feature => {
    const html = `<h3>${feature.properties.place}</h3><hr><p>Mag: ${feature.properties.mag}</p><hr><p>${new Date(feature.properties.time)}</p>`;
    const circle = L.circleMarker(feature.geometry.coordinates, {
      stroke: true,
      fillOpacity: 0.7,
      color: "red",
      fillColor: "orange",
      radius: Math.sqrt(feature.properties.mag) * 10
    }).bindPopup(html);

    return circle;
  });
}

// Create a map with the provided features
function createMap(features) {
  const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  L.map("map", {
    center: [37.7517, -106.1063],
    zoom: 5,
    layers: [street, ...features]
  });
}