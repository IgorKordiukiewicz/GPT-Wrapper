<template>
    <div class="chat-container">
        <div class="messages-container">
            <div v-for="index in 10">
                <label>AI</label>
                <p class="message-content">
                    Lorem ipsum
                </p>    
            </div>
            
        </div>
        <form class="input-container">
            <input type="text" class="input" placeholder="Input message" />
            <button type="submit" class="button">Send</button>
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
    background: #3d3d3d;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 0.5rem;
}

.input-container {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border-top: 2px solid #3d3d3d;
    padding-top: 8px;
}


</style>