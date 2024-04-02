<script setup lang="ts">
import type ExpandableInput from '~/components/ExpandableInput.vue';
import { type Message, MessageSender } from '~/types/chat';


definePageMeta({
    alias: '/'
});

const messages = ref<Message[]>([])
const messageInput = ref<InstanceType<typeof ExpandableInput> | null>();

const systemMessage = ref<string | undefined>();
const systemMessageInput = ref<string | undefined>();

const inProgress = ref<boolean>(false);

const messagesContainer = ref();
const optionsDialog = ref();

const api = useApi();

const isSendButtonDisabled = computed(() => {
    return !messageInput.value?.isValid || inProgress.value;
});

function resetChat() {
    messages.value = [];
}

async function sendMessage(event: Event) {
    if(!messageInput.value) {
        return;
    }
    event.preventDefault();
    inProgress.value = true;

    const message = messageInput.value.input!;
    messageInput.value.reset();
    messages.value.push({ sender: MessageSender.User, content: message });

    await updateLastMessageWithApiResponse();
}

async function regenerateMessage(event: Event) {
    inProgress.value = true;
    messages.value.pop();
    await updateLastMessageWithApiResponse();
}

async function updateLastMessageWithApiResponse() {
    const messagesCopy = [...messages.value];
    messages.value.push({ sender: MessageSender.AI, content: undefined });
    scrollToLatestMessage();

    const response = await api.sendChatMessage(messagesCopy, systemMessage.value);
    if(!response) {
        messages.value.pop();
        messages.value.pop();
        return;
    }

    messages.value[messages.value.length - 1].content = response;
    inProgress.value =false;
    scrollToLatestMessage();
}

function scrollToLatestMessage() {
    nextTick(() => {
        if(messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
}

function isLastMessage(message: Message) {
    return messages.value.indexOf(message) == messages.value.length - 1;
}

function showOptionsDialog() {
    optionsDialog.value.show();
}

function updateSystemMessage() {
    systemMessage.value = systemMessageInput.value;
}

</script>

<template>
    <div class="chat-container">
        <div style="position: relative">
            <div class="toolbar">
                <IconButton icon="bi-arrow-counterclockwise" class="toolbar-item" @onClick="resetChat"></IconButton>
                <IconButton icon="io-options" class="toolbar-item" @onClick="showOptionsDialog"></IconButton>
            </div>
            <Dialog title="Chat Options" ref="optionsDialog" @onSubmit="updateSystemMessage">
                <label>System Message</label>
                <ExpandableInput placeholder="Enter system message..." class="system-message-input" v-model="systemMessageInput"></ExpandableInput>
            </Dialog>
        </div>
        <div class="messages-container" ref="messagesContainer">
            <div v-for="message in messages">
                <template v-if="message.sender == MessageSender.AI">
                    <div class="ai-actions">
                        <label>{{ MessageSender[message.sender] }}</label>
                        <ClipboardCopy v-if="message.content" :content="message.content"></ClipboardCopy>
                        <IconButton v-if="message.content && isLastMessage(message)" icon="bi-arrow-counterclockwise" :size-px="16" @click="regenerateMessage"></IconButton>
                    </div>
                </template>
                <template v-else>
                    <label>{{ MessageSender[message.sender] }}</label>
                </template>
                
                <p class="message-content">
                    <template v-if="message.content">
                        {{  message.content }}
                    </template>
                    <template v-else>
                        <div class="loader-container">
                            <DotLoader></DotLoader>
                        </div>
                    </template>
                </p>    
            </div>
        </div>
        <form class="input-container" @submit="sendMessage">
            <ExpandableInput placeholder="Enter message..." ref="messageInput" :fullWidth="true"></ExpandableInput>
            <button type="submit" class="button primary message-button" :disabled="isSendButtonDisabled">
                <IconText text="Send" icon="io-send"></IconText>
            </button>
        </form>
    </div>
</template>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.toolbar:hover {
    height: 2rem;
    transition: height 0.15s ease;
}

.toolbar .toolbar-item {
    visibility: hidden;
}

.toolbar:hover .toolbar-item {
    visibility: visible;
}

.toolbar {
    position: absolute; 
    height: 0.5rem; 
    left: 50%;
    transform: translate(-50%, -1rem);
    background: var(--secondary-color);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0 0.5rem;
    cursor: pointer;
}

.system-message-input {
    max-height: 40vh; 
    width: 25vw;
}

.messages-container {
    overflow-y: auto;
    flex: 1;
    width: 100%;
    height: 100%;
    margin-bottom: 1rem;
}

.message-content {
    background: #3d3d3d88;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 0.5rem;
    margin-right: 1rem;
    color: #c5c5c5;
    white-space: pre-wrap;
}

.input-container {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: end;
    border-top: 2px solid var(--secondary-color);
    padding-top: 8px;
}

.loader-container {
    display: flex;
    align-items: center;
    height: 20px; 
    padding-left: 1rem;
}

.ai-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.message-button {
    height: 56px;
}
</style>