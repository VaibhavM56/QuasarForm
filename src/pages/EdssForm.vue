<template>
  <div class="q-ma-md">
    <div class="text-h4 q-ma-md">EDSS 300 Final FieldWork Evaluation</div>
    <q-separator />
    <div class="row justify-between">
      <div class="col-8">
        <div class="row no-wrap justify-start items-start">
          <div class="column q-ml-xs">
            <div class="text-h6">
              {{ formStore.schema[0].title }}
            </div>
          </div>
        </div>
        <!-- <PageHeader
          title="EDSS 300: Introduction to Teaching Field Work Evaluation Form"
        /> -->
      </div>
      <div class="col-4 items-end column q-mt-md">
        <q-btn @click="onSubmit">Submit</q-btn>
      </div>
    </div>

    <div class="text-subtitle1 q-ma-lg info1">
      We ask your assistance in assessing the fieldwork performance of the
      candidate named above. This candidate is applying for the Single Subject
      Credential Program at CSULB. Your professional comments are very important
      to us and are used in determining the student's acceptance into the
      program. Please evaluate the candidate as an entering candidate, not as an
      experienced member of the teaching profession. This assessment is
      confidential and will only be reviewed by program faculty and staff.
    </div>

    <q-form>
      <div
        v-for="item in formStore.schema[0].input[0].fields"
        :key="item.name"
        class="q-ma-md"
      >
        <!-- <BaseLabel :label="item.label" /> -->
        <div class="text-subtitle1">
          {{ item.label }}
          <span v-if="item.required" style="color: red">*</span>
        </div>
        <q-input
          v-model="
            formStore.schema[0].formData[0].fields.find(
              (field) => field.name === item.name
            ).value
          "
          :required="item.required"
          :type="item.type"
          outlined
          :rules="[(value) => validateField(value, item.rules)]"
          class="form-input"
          :error="
            !!formStore.schema[0].formData[0].fields.find(
              (field) => field.name === item.name
            ).error
          "
          :error-message="
            formStore.schema[0].formData[0].fields.find(
              (field) => field.name === item.name
            ).error
          "
        />
      </div>
      <div
        class="q-ma-md"
        v-for="(tableItems, tableIndex) in formStore.schema[0].input[0].tables"
        :key="tableItems.name"
      >
        <q-table
          flat
          :title="tableItems.label"
          :rows="tableItems.rows"
          :columns="tableItems.columns"
          separator="none"
          row-key="id"
          hide-bottom
          class="table-class"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-criteria="props">
            <div class="text-subtitle1 q-ma-md" :style="{ width: '300px' }">
              {{ props.row.criteria }}
              <span v-if="props.row.required" style="color: red">*</span>
            </div>
            <div
              class="text-caption text-red-13 q-ml-md q-mb-md"
              v-if="
                onShow === true &&
                !formStore.schema[0].formData[0].tables.find(
                  (table) => table.name === tableItems.name
                ).table_values[props.rowIndex].value
              "
            >
              Field is required *
            </div>
          </template>

          <template v-slot:body-cell="props">
            <q-td :props="props" no-hover>
              <div v-if="props.col.name !== 'criteria'" class="q-ma-xs">
                <q-radio
                  v-model="
                    formStore.schema[0].formData[0].tables[
                      tableIndex
                    ].table_values.find(
                      (row) => row.criteria === props.row.criteria
                    ).value
                  "
                  :val="props.col.name"
                  dense
                  @update:model-value="
                    updateTableValue(
                      tableIndex,
                      props.row.criteria,
                      props.col.name
                    )
                  "
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>

      <div class="q-ma-lg">
        <div class="text-h6">
          Additional Upload Transcript<span style="color: red">*</span>
        </div>
        <q-file
          outlined
          @input="handleFileUpload"
          v-model="file"
          use-chips
          class="form-upload"
          :error="!!fileError"
          :error-message="fileError"
        >
          <template v-slot:append>
            <q-icon name="download" v-if="base64String" @click="downloadFile" />
          </template>
        </q-file>
      </div>

      <div class="q-ma-lg">
        <div class="text-h6">Comments</div>
        <div class="q-pa-md" style="max-width: 900px">
          <q-input
            type="textarea"
            filled
            v-model="formStore.schema[0].formData[0].comments"
          />
        </div>
      </div>

      <div class="text-subtitle1 q-ma-lg info1">
        A copy of this evaluation will be submitted as part of the candidate’s
        program application. Students who receive a poor overall fieldwork
        evaluation will meet with the appropriate department committee to
        discuss their future in the program. We thank you for supporting the
        Teacher Candidate in your classroom and for taking the time to complete
        the evaluation form.
      </div>
    </q-form>

    <div v-if="onShow">
      <pre></pre>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useFormStore } from "src/stores/form";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const formStore = useFormStore();
const onShow = ref(false);
const file = ref(null);
const base64String = ref("");
const fileError = ref("");
const formIsValid = ref(true);

onBeforeMount(() => {
  formStore.populateTableValues();
  console.log(formStore.schema);
});

const onSubmit = () => {
  formIsValid.value = true;

  formStore.schema[0].input[0].fields.forEach((item) => {
    const field = formStore.schema[0].formData[0].fields.find(
      (field) => field.name === item.name
    );

    if (item.required && !field.value) {
      formIsValid.value = false;
      field.error = "Field is required";
    } else if (item.rules) {
      const validationMessage = validateField(field.value, item.rules);
      if (validationMessage !== true) {
        field.error = validationMessage;
        formIsValid.value = false;
      } else {
        field.error = "";
      }
    } else {
      field.error = "";
    }
  });

  formStore.schema[0].input[0].tables.forEach((table, tableIndex) => {
    table.rows.forEach((row, rowIndex) => {
      const tableValue =
        formStore.schema[0].formData[0].tables[tableIndex].table_values[
          rowIndex
        ].value;

      if (row.required && !tableValue) {
        formIsValid.value = false;
      }
    });
  });

  if (!file.value) {
    formIsValid.value = false;
    fileError.value = "File upload is required";
    // console.log("File upload is invalid");
  } else {
    fileError.value = "";
  }

  onShow.value = true;

  if (formIsValid.value) {
    console.log("Form Submitted:", formStore.schema[0].formData[0]);
    generatePDF();
  } else {
    console.log("Form is invalid. Not submitting.");
  }
};

formStore.schema[0].formData[0].fields.forEach((field) => {
  watch(
    () => field.value,
    (newValue) => {
      const fieldSchema = formStore.schema[0].input[0].fields.find(
        (item) => item.name === field.name
      );

      if (fieldSchema && fieldSchema.rules) {
        const validationMessage = validateField(newValue, fieldSchema.rules);

        if (validationMessage !== true) {
          field.error = validationMessage;
          formIsValid.value = false;
        } else {
          field.error = "";
          formIsValid.value = true;
        }
      }
    }
  );
});

watch(
  () => file.value,
  (newFile) => {
    if (fileError.value && newFile) {
      fileError.value = "";
    }
  }
);

function validateField(value, rule) {
  switch (rule) {
    case "name":
      return validateName(value);
    case "hours":
      return validateHours(value);
    case "csulbid":
      return validateCSULBID(value);
    default:
      return true;
  }
}

function validateName(value) {
  return (value && value.trim().length > 0) || "Field is required";
}

function validateHours(value) {
  const hours = parseFloat(value);
  return (!isNaN(hours) && hours > 0) || "Please enter a valid number of hours";
}

function validateCSULBID(value) {
  return /^[0-9]{8}$/.test(value) || "CSULB ID must be exactly 8 digits";
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    base64String.value = reader.result;
    formStore.schema[0].formData[0].fileUpload = base64String.value;
    // console.log(formStore.schema[0].formData[0].fileUpload);
  };
};

const downloadFile = () => {
  const link = document.createElement("a");
  link.href = base64String.value;
  link.download = "downloaded_file";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log(link);
};

const updateTableValue = (tableIndex, criteria, value) => {
  const tableValue = formStore.schema[0].formData[0].tables[
    tableIndex
  ].table_values.find((row) => row.criteria === criteria);
  if (tableValue) {
    tableValue.value = value;
  }
};

const generatePDF = () => {
  const candidateInfo = formStore.schema[0].input[0].fields.map((field) => {
    const value =
      formStore.schema[0].formData[0].fields.find((f) => f.name === field.name)
        ?.value || "Not Provided";

    return `${field.label}: ${value}`;
  });

  const formattedCandidateInfo = [];
  for (let i = 0; i < candidateInfo.length; i += 2) {
    formattedCandidateInfo.push([
      { text: candidateInfo[i] || "" },
      { text: candidateInfo[i + 1] || "" },
    ]);
  }

  const tablesInfo = formStore.schema[0].input[0].tables.flatMap((table) => [
    { text: table.label, style: "subheader" },
    {
      table: {
        body: [
          ...table.rows.map((row) => {
            const value =
              formStore.schema[0].formData[0].tables
                .find((t) => t.name === table.name)
                .table_values.find((tv) => tv.criteria === row.criteria)
                ?.value || "Not Observed";

            return [row.criteria, value];
          }),
        ],
        widths: ["*", "*"],
      },
      layout: "noBorders",
    },
  ]);

  const docDefinition = {
    content: [
      { text: formStore.schema[0].title, style: "header" },
      // { text: "Candidate Information", style: "subheader" },
      {
        table: {
          body: formattedCandidateInfo,
          widths: ["*", "*"],
          alignment: "left",
        },
        layout: "noBorders",
      },
      ...tablesInfo,
      { text: "Comments", style: "subheader" },
      {
        text:
          formStore.schema[0].formData[0].comments || "No comments provided.",
        margin: [0, 0, 0, 10],
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
        decoration: "underline",
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 10],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("EvaluationForm.pdf");
};
</script>

<style lang="scss" scoped>
.info1 {
  align-content: space-evenly;
}

.form-input {
  width: 100%;
  max-width: 550px;
}

.radio-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-class {
  border: 2px solid black;
}

.form-upload {
  width: 100%;
  max-width: 550px;
}
</style>
