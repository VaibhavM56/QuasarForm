<template>
  <Qalendar :events="events" :config="config" />
  <Qalendar :events="events" :config="config2" />
  <DatePicker
    locale="en-US"
    firstDayOfWeek="sunday"
    :disable-dates="disableDates"
    :default-date="new Date(2022, 5, 1)"
    @updated="handleUpdate"
  />
</template>

<script setup>
import { Qalendar } from "qalendar";
import { schema } from "src/schema/date1";
import { ref } from "vue";

const events = ref(schema);

const disableDates = new Date();

const config = ref({
  locale: "en-UK",
  defaultMode: "month",
  disableModes: "week,day",
  style: {
    colorSchemes: {
      meetings: {
        color: "#F7FFFB",
        backgroundColor: "#fffff",
      },
      sports: {
        color: "#fff",
        backgroundColor: "#ff4081",
      },
    },
  },
});

const config2 = ref({
  locale: "en-UK",
  defaultMode: "week",
  disableModes: "month,day",
  style: {
    colorSchemes: {
      meetings: {
        color: "#fff",
        backgroundColor: "#131313",
      },
      sports: {
        color: "#fff",
        backgroundColor: "#ff4081",
      },
    },
  },
});
</script>

<style>
@import "qalendar/dist/style.css";
</style>
