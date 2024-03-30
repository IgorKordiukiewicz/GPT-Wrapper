import { useToast } from "vue-toastification";

interface OpenAIChatResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{message: {
        content: string;
        role: string;
    }}>;
}

interface OpenAICreateImageResponse {
    created: number;
    data: Array<{ url: string }>
}

export const useApi = () => {
    const toast = useToast();

    return {
        async getChatMessage(messages: {role: string, content: string}[]) {
            try  {
                const { data } = await useFetch<OpenAIChatResponse>('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    body: {
                        model: 'gpt-4-turbo-preview',
                        messages: messages
                    },
                    headers: getHeaders()
                });

                return data.value?.choices[0].message.content;
            }
            catch(error) {
                toast.error('Error while calling the OpenAI API');
            }
        },
        async getGeneratedImage(prompt: string) {
            try {
                const { data } = await useFetch<OpenAICreateImageResponse>('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    body: {
                        model: 'dall-e-3',
                        prompt: prompt
                    },
                    headers: getHeaders()
                });

                return data.value?.data[0].url;
            }
            catch(error) {
                toast.error('Error while calling the OpenAI API');
            }
        },
        async getGeneratedSpeech(input: string) {
            try {
                const { data } = await useFetch('https://api.openai.com/v1/audio/speech', {
                    method: 'POST',
                    body: {
                        model: 'tts-1',
                        input: input,
                        voice: 'alloy'
                    },
                    headers: getHeaders()
                });
                return data.value;
            }
            catch(error) {
                toast.error('Error while calling the OpenAI API');
            }
        },
        async generateTranscription(file: File) {
            try {
                const formData = new FormData();
                formData.append('model', 'whisper-1');
                formData.append('file', file);

                const { data } = await useFetch<any>('https://api.openai.com/v1/audio/transcriptions', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${getApiKey()}`
                    }
                });
                
                return data.value?.text;
            }
            catch(error) {
                toast.error('Error while calling the OpenAI API');
            }
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