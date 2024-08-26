import { UnAuthorized } from "src/router/UnAuthorized";

const routes = [
  ...UnAuthorized,
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("src/pages/HomePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "edss",
        path: "/edss",
        component: () => import("src/pages/EdssForm.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
