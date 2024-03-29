<script setup lang="ts">

definePageMeta({
    alias: '/'
});

enum MessageSender {
    User,
    AI
}

type Message = {
    sender: MessageSender,
    content: string | undefined
}

const messages = ref<Message[]>([])
const messageInput = ref<string>();

const messagesContainer = ref();

const api = useApi();

const isSendButtonDisabled = computed(() => {
    if(!messageInput || !messageInput.value) {
        return true;
    }

    return messageInput.value.length == 0;
})

async function sendMessage(event: Event) {
    event.preventDefault();

    const message = messageInput.value!;
    messageInput.value = '';
    messages.value.push({ sender: MessageSender.User, content: message });

    await updateLastMessageWithApiResponse();
}

async function regenerateMessage(event: Event) {
    messages.value.pop();
    await updateLastMessageWithApiResponse();
}

async function updateLastMessageWithApiResponse() {
    var apiMessages = mapMessagesToApiData();
    messages.value.push({ sender: MessageSender.AI, content: undefined });
    scrollToLatestMessage();

    const response = await api.getChatMessage(apiMessages);
    if(!response) {
        messages.value.pop();
        messages.value.pop();
        return;
    }

    messages.value[messages.value.length - 1].content = response;
    scrollToLatestMessage();
}

function mapMessagesToApiData() {
    return messages.value.map(x => ({
        role: x.sender == MessageSender.AI ? 'assistant' : 'user',
        content: x.content as string
    }));
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

</script>

<template>
    <div class="chat-container">
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
            <input type="text" class="input full-width" placeholder="Enter message..." v-model="messageInput" />
            <button type="submit" class="button primary" :disabled="isSendButtonDisabled">
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
    height: 80vh;
}

.messages-container {
    overflow-y: scroll;
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
    align-items: center;
    border-top: 2px solid #3d3d3d;
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
</style>