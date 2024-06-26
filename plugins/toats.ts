import Toast, { type PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, options);
})