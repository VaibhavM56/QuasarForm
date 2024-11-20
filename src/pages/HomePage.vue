<template>
  <div class="q-ma-lg">
    <q-table
      class="input-table"
      :columns="columns"
      :rows="rows"
      :rows-per-page-options="[0]"
      flat
      bordered
      hide-bottom
      wrap-cells
    >
      <template #body="props">
        <q-tr no-hover :props="props">
          <q-td key="name" no-hover :props="props" :style="{ width: '400px' }">
            {{ props.row.name }}
          </q-td>

          <q-td
            key="description"
            no-hover
            :props="props"
            :style="{ width: '600px' }"
          >
            {{ props.row.description }}
          </q-td>

          <q-td key="hours" no-hover :props="props">
            {{ props.row.hours }}
          </q-td>

          <q-td key="status" no-hover :props="props">
            {{ props.row.status }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <TableComp :rows="rows" :columns="columns" bordered wrap-cells /> -->
    <!-- <pre>{{ rows }}</pre> -->
    <q-btn label="view details"></q-btn>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/Auth";
import { onBeforeMount, onMounted, ref } from "vue";
import TableComp from "src/components/TableComp.vue";

const $q = useQuasar();
const authStore = useAuthStore();

const columns = [
  {
    name: "name",
    label: "Name",
    align: "left",
    sortable: true,
    field: (row) => row.name,
  },
  {
    name: "description",
    label: "Description",
    align: "left",
    sortable: true,
    field: (row) => row.description,
  },
  {
    name: "hours",
    label: "Total Hours",
    align: "center",
    sortable: true,
    field: (row) => row.hours,
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    sortable: true,
    field: (row) => row.status,
  },
];

const rows = ref([]);

// const showLoading = () => {
//   $q.loading.show();

//   // hiding in 2s
//   setTimeout(() => {
//     $q.loading.hide();
//     fetchData();
//     show.value = !show.value;
//   }, 5000);
// };

const fetchData = async () => {
  try {
    const response = await authStore.getData();
    const fetchedData = response.data.rubricsTemplateList;

    rows.value = fetchedData.map((item) => ({
      name: item.templateName,
      description: item.templateDescription,
      hours: item.totalPoints,
      status:
        item.isPublished && item.isReadytoPublish
          ? "Published"
          : "Ready to Publish",
    }));
    console.log(response);
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
/* .table-description .q-td:hover {
  background-color: #f7f7f7;
}

.input-table .q-tr:hover {
  background-color: #f7f7f7;
}

.input-table .q-td:hover {
  background-color: #f7f7f7;
} */
</style>
