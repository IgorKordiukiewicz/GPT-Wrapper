import { type Message, MessageSender } from './../types/chat';
import { useToast } from "vue-toastification";
import { encodingForModel } from 'js-tiktoken';

export const useApi = () => {
    const toast = useToast();

    async function performRequest(url: string, body: any, headers?: any) {
        try  {
            const { data, error } = await useFetch<any>(`https://api.openai.com/v1/${url}`, {
                method: 'POST',
                body: body,
                headers: headers ? headers : getHeaders()
            });
    
            if(error.value) {
                throw new Error(error.value.message);
            }
    
            if(!data.value) {
                throw new Error('Data is empty');
            }
    
            return data.value;
        }
        catch(error) {
            toast.error('Error while calling the OpenAI API');
        }
    }

    return {
        async sendChatMessage(messages: Message[], systemMessage?: string) { 
            const data = await performRequest('chat/completions', {
                model: 'gpt-4-turbo-preview',
                messages: mapMessagesToApiModel(messages, systemMessage)
            });
            return data?.choices[0].message.content;
        },
        async generateImage(prompt: string) {
            const data = await performRequest('images/generations', {
                model: 'dall-e-3',
                prompt: prompt
            });
            return data?.data[0].url;
        },
        async generateSpeech(input: string) {
            const data = await performRequest('audio/speech', {
                model: 'tts-1',
                input: input,
                voice: 'alloy'
            });
            return data;
        },
        async generateTranscription(file: File) {
            const formData = new FormData();
            formData.append('model', 'whisper-1');
            formData.append('file', file);

            const data = await performRequest('audio/transcriptions', formData, {
                'Authorization': `Bearer ${getApiKey()}`
            });
            return data?.text;
        }
    }
}

function getHeaders() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getApiKey()}`
    };
    return headers;
}

function getApiKey() {
    const apiKey = localStorage.getItem('apiKey');
    if(!apiKey) {
        throw new Error('Api key is not set');
    }

    return apiKey;
}

function mapMessagesToApiModel(messages: Message[], systemMessage?: string) {
    const mappedMessages = messages.map(x => ({
        role: x.sender == MessageSender.AI ? 'assistant' : 'user',
        content: x.content as string
    }));

    if(systemMessage) {
        mappedMessages.unshift({
            role: 'system',
            content: systemMessage
        });
    }

    // Remove older messages if necessary to not exceed the token limit
    const enc = encodingForModel('gpt-4-turbo-preview');
    const systemMessageTokens = systemMessage ? enc.encode(systemMessage).length : 0;
    const lastMessageTokens = enc.encode(mappedMessages[mappedMessages.length - 1].content).length;
    var totalTokens = 0;
     // 4095 - max allowed, and leave 1000 for generation
    const tokensThreshold = 4095 - 1000 - systemMessageTokens - lastMessageTokens;
    if(tokensThreshold <= 0 || mappedMessages.length < 3) {
        return mappedMessages;
    }

    for(var i = mappedMessages.length - 2; i >= 0; i -= 2) {
        const aiMessage = mappedMessages[i].content;
        const userMessage = mappedMessages[i - 1].content;

        totalTokens += enc.encode(aiMessage + userMessage).length;
        if(totalTokens > tokensThreshold) {
            const startIndex = systemMessage ? 1 : 0;
            const elementsCount = i - startIndex + 1;
            mappedMessages.splice(startIndex, elementsCount);
            break;
        }
    }

    return mappedMessages;
}