import { defineStore } from "pinia";
import { ref } from "vue";

export const useFormStore = defineStore("form", () => {
  const schema = ref([
    {
      title: "EDSS 300: Introduction to Teaching Field Work Evaluation Form",
      input: [
        {
          fields: [
            {
              name: "candidate-name",
              type: "text",
              label: "Candidate Name",
              required: true,
              rules: "name",
            },
            {
              name: "csulb-id",
              type: "number",
              label: "CSULBID",
              required: true,
              rules: "csulbid",
            },
            {
              name: "demonstration-teacher",
              type: "text",
              label: "Demonstration Teacher Name",
              required: true,
              rules: "name",
            },
            {
              name: "hours-spent",
              type: "number",
              label: "Number of hours spent",
              required: true,
              rules: "hours",
            },
          ],
          tables: [
            {
              name: "communication-skills",
              label: "Communication Skills",
              description:
                "Please check the appropriate box for the indicators in each category. Use the following rubric:",
              required: true,
              columns: [
                {
                  name: "criteria",
                  required: true,
                  label: "",
                  align: "left",
                },
                {
                  name: "Needs Improvement",
                  align: "center",
                  label: "Needs Improvement",
                },
                {
                  name: "Satisfactory",
                  align: "center",
                  label: "Satisfactory",
                },
                {
                  name: "Strong",
                  align: "center",
                  label: "Strong",
                },
                {
                  name: "Outstanding - Top 5%",
                  align: "center",
                  label: "Outstanding - Top 5%",
                },
                {
                  name: "Not Observed",
                  align: "center",
                  label: "Not Observed",
                },
              ],
              rows: [
                {
                  id: 1,
                  criteria: "Spoken English",
                  required: true,
                },
                {
                  id: 2,
                  criteria: "Written English (including emails)",
                  required: true,
                },
                {
                  id: 3,
                  criteria:
                    "Demonstrates confidence (e.g.body language, audible)",
                  required: true,
                },
                {
                  id: 4,
                  criteria: "Active listening skills",
                  required: true,
                },
              ],
            },
            {
              name: "professional-attitudes",
              label: "Professional Attitudes & Behavior",
              description:
                "Please check the appropriate box for the indicators in each category. Use the following rubric:",
              required: true,
              columns: [
                {
                  name: "criteria",
                  required: true,
                  label: "",
                  align: "left",
                },
                {
                  name: "Needs Improvement",
                  align: "center",
                  label: "Needs Improvement",
                },
                {
                  name: "Satisfactory",
                  align: "center",
                  label: "Satisfactory",
                },
                {
                  name: "Strong",
                  align: "center",
                  label: "Strong",
                },
                {
                  name: "Outstanding - Top 5%",
                  align: "center",
                  label: "Outstanding - Top 5%",
                },
                {
                  name: "Not Observed",
                  align: "center",
                  label: "Not Observed",
                },
              ],
              rows: [
                {
                  id: 1,
                  criteria: "Professional appearance",
                  required: true,
                },
                {
                  id: 2,
                  criteria: "Relationships with staff",
                  required: true,
                },
                {
                  id: 3,
                  criteria: "Professional/ethical behavior",
                  required: true,
                },
                {
                  id: 4,
                  criteria: "Personal interaction and courtesy",
                  required: true,
                },
                {
                  id: 5,
                  criteria: "Dependability",
                  required: true,
                },
                {
                  id: 6,
                  criteria: "Attendance",
                  required: true,
                },
                {
                  id: 7,
                  criteria: "Punctuality",
                  required: true,
                },
                {
                  id: 8,
                  criteria:
                    "Sensitivity to diversity (e.g. gender, multicultural, LGBTQ , special needs)",
                  required: true,
                },
                {
                  id: 9,
                  criteria: "Interest & enthusiasm for teaching",
                  required: true,
                },
                {
                  id: 10,
                  criteria: "Social and intellectual maturity",
                  required: true,
                },
                {
                  id: 11,
                  criteria:
                    "Asks appropriate questions about teaching practice and student learning",
                  required: true,
                },
              ],
            },
            {
              name: "content-knowledge",
              label: "Content Knowledge & Pedagogy",
              description:
                "Please check the appropriate box for the indicators in each category. Use the following rubric:",
              required: true,
              columns: [
                {
                  name: "criteria",
                  required: true,
                  label: "",
                  align: "left",
                },
                {
                  name: "Needs Improvement",
                  align: "center",
                  label: "Needs Improvement",
                },
                {
                  name: "Satisfactory",
                  align: "center",
                  label: "Satisfactory",
                },
                {
                  name: "Strong",
                  align: "center",
                  label: "Strong",
                },
                {
                  name: "Outstanding - Top 5%",
                  align: "center",
                  label: "Outstanding - Top 5%",
                },
                {
                  name: "Not Observed",
                  align: "center",
                  label: "Not Observed",
                },
              ],
              rows: [
                {
                  id: 1,
                  criteria: "Knowledge of subject matter",
                  required: true,
                },
                {
                  id: 2,
                  criteria:
                    "Knowledge of state content standards & curriculum frameworks",
                  required: true,
                },
                {
                  id: 3,
                  criteria: "Interest & enthusiasm for subject matter",
                  required: true,
                },
                {
                  id: 4,
                  criteria:
                    "Appropriate reflection and analysis of observed strategies",
                  required: true,
                },
                {
                  id: 5,
                  criteria:
                    "Appropriate reflection and analysis of observed lesson design",
                  required: true,
                },
                {
                  id: 6,
                  criteria:
                    "Recognition of how instruction is aligned with content standards",
                  required: true,
                },
                {
                  id: 7,
                  criteria:
                    "Recognition of how instruction is differentiated to engage all learners",
                  required: true,
                },
              ],
            },
            {
              name: "interaction-student",
              label: "Interactions With Students",
              description:
                "Please check the appropriate box for the indicators in each category. Use the following rubric:",
              required: true,
              columns: [
                {
                  name: "criteria",
                  required: true,
                  label: "",
                  align: "left",
                },
                {
                  name: "Weak",
                  align: "center",
                  label: "Weak",
                },
                {
                  name: "Needs Improvement",
                  align: "center",
                  label: "Needs Improvement",
                },
                {
                  name: "Satisfactory",
                  align: "center",
                  label: "Satisfactory",
                },
                {
                  name: "Strong",
                  align: "center",
                  label: "Strong",
                },
                {
                  name: "Outstanding - Top 5%",
                  align: "center",
                  label: "Outstanding - Top 5%",
                },
              ],
              rows: [
                {
                  id: 1,
                  criteria: "Appropriate interactions with students",
                  required: true,
                },
                {
                  id: 2,
                  criteria: "Attitude of class toward candidate",
                  required: true,
                },
                {
                  id: 3,
                  criteria: "Realistic expectations for behavior",
                  required: true,
                },
                {
                  id: 4,
                  criteria: "Supports and motivates students",
                  required: true,
                },
              ],
            },
            {
              name: "overall-assessment",
              label: "Overall Assessment of Candidate",
              description: "",
              required: true,
              columns: [
                {
                  name: "criteria",
                  required: true,
                  label: "",
                  align: "left",
                },
                {
                  name: "Weak",
                  align: "center",
                  label: "Weak",
                },
                {
                  name: "Needs Improvement",
                  align: "center",
                  label: "Needs Improvement",
                },
                {
                  name: "Satisfactory",
                  align: "center",
                  label: "Satisfactory",
                },
                {
                  name: "Strong",
                  align: "center",
                  label: "Strong",
                },
                {
                  name: "Outstanding - Top 5%",
                  align: "center",
                  label: "Outstanding - Top 5%",
                },
              ],
              rows: [
                {
                  id: 1,
                  criteria:
                    "What degree of success do youpredict for this student as a future teacher",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
      formData: [
        {
          fields: [
            {
              name: "candidate-name",
              value: "",
            },
            {
              name: "demonstration-teacher",
              value: "",
            },
            {
              name: "hours-spent",
              value: "",
            },
            {
              name: "csulb-id",
              value: "",
            },
          ],
          tables: [
            {
              name: "communication-skills",
              table_values: [],
            },
            {
              name: "professional-attitudes",
              table_values: [],
            },
            {
              name: "content-knowledge",
              table_values: [],
            },
            {
              name: "interaction-student",
              table_values: [],
            },
            {
              name: "overall-assessment",
              table_values: [],
            },
          ],
          fileUpload: "",
          comments: "",
        },
      ],
    },
  ]);

  const populateTableValues = () => {
    schema.value[0].input[0].tables.forEach((table, index) => {
      schema.value[0].formData[0].tables[index].table_values = table.rows.map(
        (row) => ({
          criteria: row.criteria,
          value: "",
        })
      );
    });
  };
  return { schema, populateTableValues };
});
