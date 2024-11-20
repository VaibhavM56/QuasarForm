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
      {
        name: "calendar",
        path: "/calendar",
        component: () => import("src/pages/CalendarPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "calendar2",
        path: "/calendar2",
        component: () => import("src/pages/CalendarPageTwo.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "test",
        path: "/test",
        component: () => import("src/pages/TestPage.vue"),
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
