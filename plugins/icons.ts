import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoSend, BiChatFill, BiImage, BiMusicNote, BiClipboard, BiArrowCounterclockwise } from "oh-vue-icons/icons";

addIcons(IoSend, BiChatFill, BiImage, BiMusicNote, BiClipboard, BiArrowCounterclockwise);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
})