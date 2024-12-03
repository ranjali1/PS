async function fetchSpots(comp_id) {
    try {
    ///  const response = await fetch("http://localhost:8080/spot");
      const response = await fetch("http://localhost:8080/spot", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({comp_id})
      });
      const spots = await response.json();
  
      console.log(spots);
      const spot = [
        // { name: "Spot 1", coords: [35.566285, 45.371900] },
        // { name: "Spot 2", coords: [35.566241, 45.371882] },
        // { name: "Spot 3", coords: [35.566224, 45.371855] }
      ];
      for(var i = 0; i<spots.length; i++)
      {
       //console.log("s ", spots[i].lat, spots[i].long)
       if(spots[i].lat == 0)
       {
        continue;
       }
      console.log("s ", spots[i].lat, spots[i].long)

       spot.push({
        name: spots[i].spot_name,
        coords: [parseFloat(spots[i].lat), parseFloat(spots[i].long)]
      });      }
      viewMap(spot);
      //const res = await fetch("http://localhost:8080/section");


    } catch (error) {
      console.error("eror fetching spots:", error);
    }
  }

async function viewMap(spots)
{
    let previousView = { lat: 0, lng: 0, zoom: 2 }; // Store the previous map view

    function initMap() {
      const map = L.map('map').setView([0, 0], 2);

      // Add a satellite view tile layer with high resolution
      L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmExOTEyMCIsImEiOiJjbTQ0YmFqa3owYWIzMmtzNHNud3Z2M2RiIn0.DBfoVP2G0Q25-rfYxLzV5g', {
        attribution: '© OpenStreetMap contributors, © Mapbox',
        maxZoom: 22,  // Set max zoom to 22 to allow zoom beyond 19
        tileSize: 512,
        zoomOffset: -1,
        detectRetina: true // Ensure Retina support for better resolution on high-density displays
      }).addTo(map);

      // Predefined spots
    //   const spots = [
    //     { name: "Spot 1", coords: [35.566285, 45.371900] },
    //     { name: "Spot 2", coords: [35.566241, 45.371882] },
    //     { name: "Spot 3", coords: [35.566224, 45.371855] }
    //   ];

      // Add circle markers for spots
      spots.forEach(spot => {
        L.circleMarker(spot.coords, {
          radius: 8,
          color: "#545454",
          fillColor: "#fafafa",
          fillOpacity: 1
        })
          .addTo(map)
          .bindPopup(`<b>${spot.name}</b>`);
      });

      // Adjust the map view to show all spots
      const bounds = spots.map(spot => spot.coords);
      map.fitBounds(bounds);
      map.setZoom(20.2);

      // User location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const userLocation = [position.coords.latitude, position.coords.longitude];
          previousView = { lat: 0, lng: 0, zoom: 2 }; // Store initial view for "Back" button

          map.setView(userLocation, 15);

          L.marker(userLocation, {
            icon: L.divIcon({
              className: 'leaflet-marker-icon',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })
          }).addTo(map).bindPopup("You are here");
        }, function () {
          alert("Geolocation failed.");
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      // Add the "Go to Current Location" button
      const currentLocationButton = document.createElement('button');
      currentLocationButton.className = 'map-button';
      currentLocationButton.textContent = 'Go to Current Location';
      currentLocationButton.onclick = function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            map.setView(userLocation, 15);
            L.marker(userLocation, {
              icon: L.divIcon({
                className: 'leaflet-marker-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })
            }).addTo(map).bindPopup("You are here");
          });
        }
      };

      // Add the "Back to Previous Location" button
      const backButton = document.createElement('button');
      backButton.className = 'map-button';
      backButton.textContent = 'Back';
      backButton.onclick = function () {
       // map.setView([previousView.lat, previousView.lng], previousView.zoom);
        window.location.href = "./SpotDesignV2.html";
      };

      const controls = document.createElement('div');
      controls.className = 'map-controls';
      controls.appendChild(currentLocationButton);
      controls.appendChild(backButton);
      document.body.appendChild(controls);
    }
    initMap();
}
  
  const eventSource = new EventSource("http://localhost:8080/events");
  
  eventSource.onmessage = async function (event) {
    const spots = await JSON.parse(event.data);
    fetchSpots(localStorage.getItem("comp_id"));
    console.log("reloaded");
    // document.write(spots);
  };
  document.addEventListener("DOMContentLoaded", fetchSpots(localStorage.getItem("comp_id")));
  