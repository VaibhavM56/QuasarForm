<template>
  <q-table
    :title="title"
    :rows="rows"
    :columns="columns"
    :row-key="rowKey"
    :pagination="pagination"
    flat
    separator="none"
    :hide-bottom="true"
  >
    <template v-slot:body-cell-criteria="props">
      <div class="text-subtitle1 q-ma-md" :style="{ width: '300px' }">
        {{ props.row.criteria }}
        <span v-if="props.row.required" style="color: red">*</span>
        <!-- <pre>{{ props }}</pre> -->
      </div>
      <div
        class="text-caption text-red-13 q-ml-md q-mb-md"
        v-if="!isTableValueValid(props.rowIndex)"
      >
        Field is required *
      </div>
    </template>

    <template v-slot:body-cell="props">
      <q-td :props="props" no-hover>
        <div v-if="props.col.name !== 'criteria'" class="q-ma-xs">
          <q-radio
            :model-value="getTableValue(props.rowIndex)"
            :val="props.col.name"
            dense
            @update:model-value="updateTableValue(props.rowIndex, $event)"
          />
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Define props
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  rowKey: {
    type: String,
    default: "id",
  },
  pagination: {
    type: Object,
    default: () => ({ page: 1, rowsPerPage: 0 }),
  },
  title: {
    type: String,
  },
  formData: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["request"]);

const getTableValue = (index) => {
  const item = props.formData[index];
  return item ? item.value : "";
};

const updateTableValue = (index, value) => {
  const item = props.formData[index];
  if (item) {
    item.value = value;
  }
  emit("request", props.formData);
};

const isTableValueValid = (index) => {
  const item = props.formData[index];
  return item ? item.value !== "" : false;
};
</script>

<style scoped></style>
