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
import Map from '@/components/Heatmap/char-map';

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
