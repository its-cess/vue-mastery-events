import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import BaseIcon from "@/components/BaseIcon";

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

//Automatic Global Registration:
const requireComponent = require.context(
  "./components", //the relative path of the directory to search
  false, //subdirectories will not be searched
  /Base[A-Z]\w+\.(vue|js)$/ //regular expression that searches for
  //components starting with "Base" and ending in .vue or .js
);

requireComponent.keys().forEach((fileName) => {
  //keys() gets us an array of each file so we can iterate through
  //each and get the object exported using requireComponent
  const componentConfig = requireComponent(fileName);

  //making the first letter Uppercase
  const componentName = upperFirst(
    //camelCases the rest of the words in the file name to convert
    //it all to PascalCase
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
      //removes what's before and after the filename itself
    )
  );

  //registering the components globally
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.component("BaseIcon", BaseIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
