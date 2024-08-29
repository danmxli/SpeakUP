import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;

export async function transcribeAudio(audioUrl: string) {

    return new Promise(async (resolve, reject) => {
        try {
            const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');

            const output = await transcriber(audioUrl, {
                chunk_length_s: 30,
                stride_length_s: 5,
                language: 'english',
                task: 'transcribe',
            });
            if (!Array.isArray(output)) {
                console.log(output.text)
                resolve(output.text)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}