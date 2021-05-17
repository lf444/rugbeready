<template>

  <div>
    <v-row class="fill-height">
      <v-col style="padding-bottom:60px !important">
        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-btn
              outlined
              style="border-radius:4px !important;border:none !important;background:#2196f3"
              class="mr-4"
              color="white"
              @click="setToday"
            >
              Aujourd'hui
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small color="white">
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              class="mr-3"
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small color="white">
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  style="border-radius:4px !important;border:none !important;background:#2196f3"
                  outlined
                  color="white"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Jour</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semaine</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mois</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 jours</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>


        <!-- CALENDAR -->
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <!-- <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn> -->
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                <v-btn icon>
                  <font-awesome-icon style="width:16px;height:22px" icon="trash"/>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Annuler
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row justify="center" style="margin-bottom: 45px">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            style="border-radius: 4px !important"
            >Ajouter un évenement</v-btn
          >
        </template>
        <v-card style="margin: 0px !important">
          <v-card-title>
            <span class="headline">Ajouter un évenement</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="datetime-local"
                    label="Date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="datetime-local"
                    label="Date"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="this.dialog=false;">Fermer</v-btn>
            <v-btn color="blue darken-1" text 
              >Ajouter</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      dialog: false,
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },



      updateRange ({ start, end }) {
        const events = []

        // date début mois + fin mois
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        console.log(min)
        console.log(max)

        const first = new Date('2021-05-20T15:00:00')
        const second = new Date('2021-05-21T16:00:00')
        console.log(first)
        console.log(second)

        events.push({
          name: 'Event',
          details: 'Une description',
          start: first,
          end: second,
          color: 'blue',
        })

        this.events = events

        setTimeout(() => {
          var list = document.getElementsByClassName("v-event");
          for (let item of list) {
              var width = item.style.width
              var str = width.substring(0, width.length - 1);
              var x = parseInt(str) + 5
              item.style.width = String(x + "%")
          }
        }, 100);

        
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style>
.v-btn--round{
  border-radius: 20px !important;
}

.v-event{
  margin-left: 1px !important;
  margin-top: 4px !important;
  border-radius: 0px !important;

}

.v-card__text{
  color : black !important;
  text-align: start
}

</style>