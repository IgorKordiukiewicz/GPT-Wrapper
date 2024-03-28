import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag } from "oh-vue-icons/icons";

addIcons(FaFlag);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
})