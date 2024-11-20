<template>
  <div class="calendar-container">
    <div class="month-container">
      <vue-cal
        :selected-date="today"
        :disable-views="['years', 'year', 'week', 'day']"
        :events="events"
        @cell-click="onDateClick"
        class="custom-container vuecal--green-theme"
        :min-date="minDate"
        hideViewSelector
      />
    </div>
    <div class="week-container">
      <vue-cal
        :selected-date="selectedDate"
        :time-from="9 * 60"
        :time-to="19 * 60"
        :disable-views="['years', 'year', 'month', 'day']"
        :time-step="15"
        hide-weekends
        :events="events"
        @event-click="onEventClick"
        class="vuecal--green-theme"
        cell-contextmenu
        hideViewSelector
      />
    </div>
    <q-dialog v-model="showDialog">
      <q-card class="card-style">
        <q-card-section>
          <div class="q-gutter-sm">
            <span class="q-mb-sm">
              Events on {{ formatDate(selectedDate) }}:
            </span>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <!-- <span>{{ selectedEvent.title }}: </span> -->
            <q-badge color="primary" class="q-mb-sm">
              {{
                selectedEvent.start &&
                selectedEvent.end &&
                formatTimeRange(selectedEvent.start, selectedEvent.end)
              }}
            </q-badge>
            <div>
              <strong>Interview details:</strong>
              <ul>
                <li>Interviewer Name: {{ selectedEvent.InterviewerName }}</li>
                <li>Interviewee Name: {{ selectedEvent.IntervieweeName }}</li>
                <li>Location: {{ selectedEvent.location }}</li>
              </ul>
            </div>
            <q-separator />
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Close" @click="showDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { schema } from "src/schema/date";

const selectedDate = ref(null);
const showDialog = ref(false);
const disableArray = ref([]);
const events = ref(schema);
const today = ref(new Date());
const selectedEvent = ref({});

const onDateClick = (date) => {
  console.log("Date clicked:", date);
  selectedDate.value = date;
};

const onEventClick = (events, e) => {
  selectedEvent.value = events;
  showDialog.value = true;

  e.stopPropagation();
};

const minDate = computed(() => {
  return new Date();
});

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

const formatTimeRange = (start, end) => {
  if (!start || !end) return "";
  const startTime = new Date(start).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(end).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${startTime} - ${endTime}`;
};

onMounted(() => {
  disableArray.value.push(new Date());
});
</script>

<style lang="scss" scoped>
.calendar-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.month-container {
  flex: 0 0 30%;
  margin: 0;
  padding: 20px;
}

.week-container {
  flex: 0 0 70%;
  margin: 0;
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
}

.custom-calendar {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.card-style {
  width: 80vw;
  max-width: 500px;
  height: 50vh;
  overflow-y: auto;
}

.custom-event {
  cursor: pointer;
}

.q-badge {
  background-color: #007bff;
  color: white;
}

.vuecal__cell--disabled {
  text-decoration: line-through;
  color: #bbb;
}

.vuecal__cell--has-events {
  background-color: #fffacd;
}
.vuecal__cell-events-count {
  display: none;
}
.vuecal__cell--has-events {
  cursor: pointer;
}

.vuecal__cell--has-events .vuecal__event {
  cursor: pointer !important;
}
</style>
