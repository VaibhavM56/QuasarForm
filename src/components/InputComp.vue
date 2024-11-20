<template>
  <div class="base-input">
    <div class="text-subtitle1">
      {{ label }}
      <span v-if="required" style="color: red">*</span>
    </div>
    <q-input
      v-model="internalValue"
      :type="type"
      :outlined="outlined"
      :rules="rules"
      :required="required"
      :error="!!error"
      :error-message="error"
      class="form-input"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  outlined: {
    type: Boolean,
    default: true,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const updateValue = (value) => {
  internalValue.value = value;
  emit("update:modelValue", value);
};
</script>

<style scoped>
.base-input {
  margin: 16px 0;
  width: 100%;
  max-width: 400px;
}
</style>
