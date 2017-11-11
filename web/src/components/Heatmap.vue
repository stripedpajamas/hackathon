<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Map</div>
          </v-card-title>

          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-dialog
                  persistent
                  v-model="dateModal"
                  lazy
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    label="Date"
                    v-model="date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex xs6>
                <v-dialog
                  persistent
                  v-model="timeModal"
                  lazy
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    label="Time"
                    v-model="time"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker v-model="time" actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">Save</v-btn>
                      </v-card-actions>
                    </template>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-btn
              @click.native="load"
              flat color="orange"
            >
              Load
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-flex>


    <v-flex xs12>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Map</div>
          </v-card-title>

          <v-card-text>
            <Map></Map>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment';
import Map from '@/components/Heatmap/char-map';
import locationData from '../../../data/locations.json';

export default {
  name: 'Heatmap',
  data() {
    return {
      dateModal: false,
      timeModal: false,
      date: null,
      time: null,
    };
  },
  methods: {
    load() {
      let { date, time } = this;
      date = moment(date, 'YYY-MM-DD');
      time = moment(time, 'h:mma');

      // Add the timestamps to every single array item
      for (let i = 0; i < locationData.coordinates.length; i += 1) {
        locationData.coordinates[i].push(parseFloat(date.format('0.MM')));
        locationData.coordinates[i].push(parseFloat(date.format('0.DD')));
        locationData.coordinates[i].push(parseFloat(time.format('0.kk')));
        locationData.coordinates[i].push(parseFloat(time.format('0.mm')));
      }

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      fetch('https://hackathon-ydjpdnorqb.now.sh/machine', {
        method: 'post',
        headers,
        body: JSON.stringify({
          input: locationData.coordinates,
        }),
      }).then(response => response.json())
      .then((d) => {
        // get json data in here
        const locations = locationData.coordinates;
        const data = d.output;

        let min = 99999;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i][0] < min) min = data[i][0];
        }
        let max = 0;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i][0] > max) max = data[i][0];
        }

        const heatmapData = [];
        let percent = 0;
        locations.forEach((location, index) => {
          percent = (data[index][0] - min) / (max - min);
          heatmapData.push({
            location: new window.google.maps.LatLng(location[0], location[1]),
            weight: percent * 30,
          });
        });

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
        heatmap.set('radius', 100);
      });
    },
  },
  components: {
    Map,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
