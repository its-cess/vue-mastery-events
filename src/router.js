import Vue from "vue";
import Router from "vue-router";
import EventList from "./views/EventList.vue";
import EventShow from "./views/EventShow.vue";
import EventCreate from "./views/EventCreate.vue";
import NProgress from "nprogress";
import store from "@/store/store";
import NotFound from "./views/NotFound";
import NetworkIssue from "./views/NetworkIssue";
import Example from "./views/Example";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true,
    },
    {
      path: "/example",
      component: Example,
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("event/fetchEvent", routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event;
            next();
          })
          //if an error, redirect to 404 route. passing in the 'event' name which is missing
          .catch((error) => {
            //if error = 404, send to 404 error page.
            if (error.response && error.response.status == 404) {
              next({ name: "404", params: { resource: "event" } });
            } //otherwise send to the network-issue error page
            else {
              next({ name: "network-issue" });
            }
          });
      },
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate,
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      //must accept props so that it knows the event name which we passed to it
      props: true,
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue,
    },
    //catch all route: if the route does not match any of the routes
    //above it, it will redirect to the 404 Not Found component
    {
      path: "*",
      //sending in the missing resource as 'page'
      redirect: { name: "404", params: { resource: "page" } },
    },
  ],
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
