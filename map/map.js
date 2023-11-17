document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map('map').setView([-37.721, 145.048], 16);
  
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Disable zooming out
    map.setMinZoom(16);
  
    // Disable zoom control
    map.zoomControl.remove();
  });
  