import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
    IoSend, BiChatFill, BiImage, BiMusicNote, BiClipboard, 
    BiArrowCounterclockwise, IoSettingsSharp, IoClose, BiEye, BiEyeSlash,
    BiDownload, BiCheck2
 } from "oh-vue-icons/icons";

addIcons(
    IoSend, BiChatFill, BiImage, BiMusicNote, BiClipboard, 
    BiArrowCounterclockwise, IoSettingsSharp, IoClose, BiEye, BiEyeSlash,
    BiDownload, BiCheck2
    );

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
})