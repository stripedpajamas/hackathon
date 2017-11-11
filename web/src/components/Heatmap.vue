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
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  label="Latitude"
                  v-model="lat"
                  prepend-icon="trending_flat"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Longitude"
                  v-model="long"
                  prepend-icon="trending_flat"
                >
                </v-text-field>
              </v-flex>

            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-btn
              @click.native="load"
              flat color="orange"
              block
            >
              Load
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-flex>


    <v-flex xs12>
      <v-flex xs12>
        <v-card v-if="result">
          <v-card-title primary-title>
            <div class="headline">Result</div>
          </v-card-title>

          <v-card-text>
            <div class="display-1 text-md-center">
              Likelihood of crime: <strong>{{ result * 10e15 }}%</strong>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment';
//  import locationData from '../../../data/locations.json';

export default {
  name: 'Heatmap',
  data() {
    return {
      dateModal: false,
      timeModal: false,
      date: null,
      time: null,
      long: -80.793537,
      lat: 35.280771,
      result: null,
    };
  },
  methods: {
    load() {
      const locationData = {
        coordinates: [[this.lat, this.long]],
      };
      let { date, time } = this;
      date = moment(date, 'YYY-MM-DD');
      time = moment(time, 'h:mma');

      // Add the timestamps to the loc
      locationData.coordinates[0].push(parseFloat(date.format('0.MM')));
      locationData.coordinates[0].push(parseFloat(date.format('0.DD')));
      locationData.coordinates[0].push(parseFloat(time.format('0.kk')));
      locationData.coordinates[0].push(parseFloat(time.format('0.mm')));

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      fetch('http://localhost:3000/machine', {
        method: 'post',
        headers,
        body: JSON.stringify({
          input: locationData.coordinates,
        }),
      }).then(response => response.json())
        .then((json) => {
          this.result = json.output[0][0];
        });
    },
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
