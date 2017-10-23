<template>
  <div class="hello">

    <v-row>
      <v-grid m5>

            <v-row>
              <v-grid m7>
                <v-text-input v-model="modelEan"></v-text-input>
              </v-grid>
              <v-grid m5>
                <a v-on:click="getStart"><v-btn>GO</v-btn></a>
              </v-grid>
            </v-row>

            <v-row v-if="ean != ''">
              <h4>Informations</h4>

              <ul>
                <li><b>Position</b>: {{ position.lat }};{{ position.lng }}</li>
                <li><b>Distance</b>: {{ Math.round(distance()) }}M / {{ Math.floor(distance() * 3,28084) }}Ft</li>
                <li><b>Speed</b>: <v-chip>{{ Math.round(speed) }} Km/h</v-chip> | <v-chip>{{ Math.round(speed * 0.6213711923) }} Mi/h</v-chip></li>
                <li><b>Date</b>: {{ getMoment().format('MMMM Do YYYY, hh:mm:ss A') }} / {{ getMoment().fromNow() }}</li>
              </ul>

              <v-row v-if="history.length > 0">
                <h4>History</h4>

                <v-collection class="history">
                  <v-collection-avatar v-for="H in history" v-bind:key="H.pos">
                    <span class="title">{{H.pos}}</span>
                    <p>{{H.speed}} <br>
                      {{H.date}}
                    </p>
                    <span slot="secondary"><v-icon>map</v-icon></span>
                  </v-collection-avatar>
                </v-collection>
              </v-row>
            </v-row>
      </v-grid>

      <v-grid m7 v-if="ean != ''">
        <h2>{{ ean }}</h2>
        <gmap-map
          :center="position"
          :zoom="12"
          style="width: 700px; height: 700px"
        >
          <gmap-marker
            :position="position"
            :clickable="true"
            :draggable="true"
            @click="center=position"
          ></gmap-marker>
        </gmap-map>
      </v-grid>
    </v-row>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
var postUrl = require('../config.js').post.url
export default {
  name: 'Welcome',
  data () {
    return {
      ean: '',
      modelEan: '',
      position: {lat: 0.0, lng: 0.0},
      lastPosition: {lat: 0.0, lng: 0.0},
      speed: 0,
      date: null,
      lastDate: null,
      history: []
    }
  },
  methods: {
    getMoment: function () {
      try {
        return moment(this.date.replace('T', '-').replace('Z', ''), 'YYYY-MM-DD-HH:mm:ss')
      } catch (e) {
        return moment()
      }
    },
    getStart: function () {
      var savEan = this.ean
      this.ean = 'Loading...'

      console.log('START')
      axios.get(postUrl + this.modelEan)
      .then(response => {
        var R = response.data[response.data.length - 1]
        console.log(R)
        // Position
        this.lastPosition = {
          lat: parseFloat(R.lat),
          lng: parseFloat(R.lon)
        }
        this.position = this.lastPosition
        // Date
        this.lastDate = R.datetime
        this.date = R.datetime
        // Speed
        this.speed = 0
        // EAN
        this.ean = this.modelEan
      })
      .catch(e => {
        console.log(e)
        this.ean = savEan
      })
    },
    distance: function () {
      var convertRad = function (input) {
        return (Math.PI * input) / 180
      }

      var R = 6378000 // Rayon de la terre en mètre
      var latDa = convertRad(this.lastPosition.lat)
      var lonDa = convertRad(this.lastPosition.lng)
      var latDb = convertRad(this.position.lat)
      var lonDb = convertRad(this.position.lng)

      var d = R * (Math.PI / 2 - Math.asin(Math.sin(latDb) * Math.sin(latDa) + Math.cos(lonDb - lonDa) * Math.cos(latDb) * Math.cos(latDa)))
      return d
    }
  },
  sockets: {
    connection: function () {
      console.log('socket connected')
    },
    position: function (val) {
      console.log(this.ean)
      if (val.ean === this.ean) {
        console.log(val)
        var gmap = {
          lat: parseFloat(val.lat),
          lng: parseFloat(val.lon)
        }
        // ----- HISTORY
        this.history.push({
          pos: this.position.lat + ';' + this.lastPosition.lng,
          speed: Math.round(this.distance()) + 'M / ' + Math.floor(this.distance() * 3.28084) + 'Ft',
          date: this.getMoment().format('MMMM Do YYYY, hh:mm:ss A') + '/' + this.getMoment().fromNow()
        })
        // Inverse
        this.lastPosition = this.position
        this.lastDate = this.date
        // New
        this.position = gmap
        this.date = val.datetime
        // Speed
        var diffHours = Math.abs(new Date(this.date) - new Date(this.lastDate)) / 36e5
        this.speed = (this.distance() / 1000) / diffHours
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history {
  height: 350px;
  overflow-y: scroll;
}
</style>
