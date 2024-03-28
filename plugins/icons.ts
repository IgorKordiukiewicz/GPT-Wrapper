import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoSend, BiChatFill, BiImage, BiMusicNote } from "oh-vue-icons/icons";

addIcons(IoSend, BiChatFill, BiImage, BiMusicNote);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
})