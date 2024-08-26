<template>
  <div>
    <q-card class="q-ma-md login-card">
      <q-card-section>
        <div class="text-h5">Login</div>
      </q-card-section>
      <q-card-section class="login-input">
        <q-input
          type="text"
          label="Username"
          v-model="authStore.state.userName"
          outlined
        />
      </q-card-section>
      <q-card-section class="login-input">
        <q-input
          type="password"
          label="Password"
          v-model="authStore.state.password"
          outlined
        />
      </q-card-section>
      <q-card-section class="login-button">
        <q-btn
          @click="authenticate"
          color="primary"
          label="Login"
          style="width: 200px"
        />
      </q-card-section>
      <!-- <q-btn @click="getData">Data</q-btn> -->
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/Auth";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();

const authenticate = async () => {
  await authStore.authenticate();
  $q.notify({
    message: authStore.message,
    color: authStore.isAuthenticated ? "green" : "red",
    textColor: "white",
    position: "top-right",
  });
  console.log(authStore.message);

  setTimeout(() => {
    if (authStore.isAuthenticated) {
      router.push({ name: "home" });
    }
  }, 2000);
};
// const getData = () => {
//   authStore.getData();
// };
</script>

<style lang="scss" scoped>
.login-card {
  margin: 10% 25%;
}
.login-input {
  width: 100%;
  max-width: 700px;
}
.login-button {
  align-items: center;
}
</style>
