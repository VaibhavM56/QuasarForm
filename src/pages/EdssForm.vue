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
        v-for="item in formStore.schema[0].form.fields"
        :key="item.name"
        class="q-ma-md"
      >
        <InputComp
          :label="item.label"
          :modelValue="formStore.schema[0].form.fields[item.id - 1].value"
          :type="item.type"
          :outlined="true"
          :rules="[(value) => validateField(value, item.rules)]"
          :required="item.required"
          @update:modelValue="(value) => updateFieldValue(item.id - 1, value)"
        />
      </div>

      <div
        class="q-ma-md"
        v-for="(tableItems, tableIndex) in formStore.schema[0].form.tables"
        :key="tableItems.name"
      >
        <TableComp
          flat
          :title="tableItems.label"
          :rows="tableItems.rows"
          :columns="tableItems.columns"
          :row-key="tableItems.id"
          class="table-class"
          :rows-per-page-options="[0]"
          hide-bottom
          :formData="formStore.schema[0].form.tables[tableIndex].rows"
          @request="handleTableRequest"
          separator="none"
        />
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
            v-model="formStore.schema[0].form.comments"
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
import InputComp from "src/components/InputComp.vue";
import TableComp from "src/components/TableComp.vue";
import { useValidateField } from "src/composables/validate";

const formStore = useFormStore();
const onShow = ref(false);
const file = ref(null);
const base64String = ref("");
const fileError = ref("");
const formIsValid = ref(true);
const { validateField } = useValidateField();

onBeforeMount(() => {
  console.log(formStore.schema[0].form);
});

const handleTableRequest = (updatedTableData) => {
  formStore.schema[0].form.tables.forEach((table) => {
    const tableIndex = formStore.schema[0].form.tables.indexOf(table);
    if (tableIndex !== -1) {
      formStore.schema[0].form.tables[tableIndex].table_values =
        updatedTableData;
    }
  });
};

const updateFieldValue = (index, value) => {
  formStore.schema[0].form.fields[index].value = value;
};

const validateFields = () => {
  formIsValid.value = true;
  fileError.value = "";

  formStore.schema[0].form.fields.forEach((item) => {
    const field = formStore.schema[0].form.fields[item.id - 1];

    if (item.required && !field.value) {
      field.error = "Field is required";
      formIsValid.value = false;
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
};

const validateTables = () => {
  formStore.schema[0].form.tables.forEach((table, tableIndex) => {
    table.rows.forEach((row, rowIndex) => {
      const tableValue =
        formStore.schema[0].form.tables[tableIndex].rows[rowIndex].value;

      if (row.required && !tableValue) {
        formIsValid.value = false;
      }
    });
  });
};

const onSubmit = () => {
  console.log("Submitting form...");

  validateFields();
  validateTables();

  console.log("File:", file.value);
  console.log("Form validity:", formIsValid.value);

  if (!file.value) {
    formIsValid.value = false;
    fileError.value = "File upload is required";
  }

  if (!formIsValid.value) {
    onShow.value = false;
    console.log("Form is invalid. Not submitting.");
    return;
  }

  // Log to ensure this code is reached
  console.log("Form is valid. Setting onShow to true.");

  onShow.value = true;
  console.log("Form Submitted:", formStore.schema[0].form);
  generatePDF();
};

// formStore.schema[0].form.fields.forEach((field) => {
//   watch(
//     () => field.value,
//     (newValue) => {
//       const fieldSchema = formStore.schema[0].form.fields.find(
//         (item) => item.name === field.name
//       );

//       if (fieldSchema && fieldSchema.rules) {
//         const validationMessage = validateField(newValue, fieldSchema.rules);

//         if (validationMessage !== true) {
//           field.error = validationMessage;
//           formIsValid.value = false;
//         } else {
//           field.error = "";
//           formIsValid.value = true;
//         }
//       }
//     }
//   );
// });

// watch(
//   () => file.value,
//   (newFile) => {
//     if (fileError.value && newFile) {
//       fileError.value = "";
//     }
//   }
// );

const handleFileUpload = (event) => {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    base64String.value = reader.result;
    formStore.schema[0].form.fileUpload = base64String.value;
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

pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
