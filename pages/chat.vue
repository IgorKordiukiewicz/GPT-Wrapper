<script setup lang="ts">

enum MessageSender {
    User,
    AI
}

type Message = {
    sender: MessageSender,
    content: string | undefined
};

const messages = ref<Message[]>([])
const messageInput = ref<string>();

async function getGPTResponse(message: string) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return 'Lorem ipsum';
}

async function sendMessage(event: Event) {
    console.log('test');
    event.preventDefault();

    const message = messageInput.value!;
    messageInput.value = '';
    messages.value.push({ sender: MessageSender.User, content: message });

    messages.value.push({ sender: MessageSender.AI, content: undefined });
    const response = await getGPTResponse(message);
    messages.value[messages.value.length - 1].content = response;
}

const isSendButtonDisabled = computed(() => {
    if(!messageInput || !messageInput.value) {
        return true;
    }

    return messageInput.value.length == 0;
})

</script>

<template>
    <div class="chat-container">
        <div class="messages-container">
            <div v-for="message in messages">
                <label>{{ MessageSender[message.sender] }}</label>
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
            <input type="text" class="input" placeholder="Input message" v-model="messageInput" />
            <button type="submit" class="button" :disabled="isSendButtonDisabled">Send</button>
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
</style>