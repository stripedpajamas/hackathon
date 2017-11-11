<template>
  <div id="map" style="height:500px;width:100%"></div>
</template>

<script>
import locationData from '../../../../data/locations.json';

export default {
  name: 'char-map',
  data() {
    return {};
  },
  mounted() {
    fetch('https://hackathon-ysfkztzsac.now.sh/machine', {
      method: 'post',
      body: JSON.stringify({
        input: locationData,
      }),
    }).then(response => response.json())
    .then((data) => {
      // get json data in here
      const locations = locationData.coordinates;

      const heatmapData = [];
      locations.forEach((location, index) =>
        heatmapData.push({
          location: new window.google.maps.LatLng(location[0], location[1]), weight: data[index][0],
        }));

      const charlotte = new window.google.maps.LatLng(35.2271, -80.8431);

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: charlotte,
        zoom: 13,
        mapTypeId: 'terrain',
      });

      const heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
      });

      heatmap.setMap(map);
    });
  },
};
</script>