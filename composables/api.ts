import { useToast } from "vue-toastification";

export const useApi = () => {
    const toast = useToast();

    async function performRequest(url: string, body: any, headers?: any) {
        try  {
            const { data, error } = await useFetch<any>(url, {
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
        async getChatMessage(messages: {role: string, content: string}[]) {
            const data = await performRequest('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4-turbo-preview',
                messages: messages
            });
            return data.choices[0].message.content;
        },
        async getGeneratedImage(prompt: string) {
            const data = await performRequest('https://api.openai.com/v1/images/generations', {
                model: 'dall-e-3',
                prompt: prompt
            });
            return data.data[0].url;
        },
        async getGeneratedSpeech(input: string) {
            const data = await performRequest('https://api.openai.com/v1/audio/speech', {
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

            const data = await performRequest('https://api.openai.com/v1/audio/transcriptions', formData, {
                'Authorization': `Bearer ${getApiKey()}`
            });
            return data.text;
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