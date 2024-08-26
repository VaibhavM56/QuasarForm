export const UnAuthorized = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/LoginPage.vue"),
    meta: { redirectIfLoggedIn: true, layout: "full" },
  },
];
