import { pipeline, env } from '@xenova/transformers';
import { computeCosineSimilarity } from '../utils';
env.allowLocalModels = false;

export async function transcribeAudio(audioUrl: string): Promise<string | null> {

    return new Promise(async (resolve, reject) => {
        try {
            const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');

            const output = await transcriber(audioUrl, {
                chunk_length_s: 30,
                stride_length_s: 5,
                language: 'english',
                task: 'transcribe',
            });
            if (Array.isArray(output)) {
                // TODO handle output data array
                reject(null)
            } else if (!output.text) {
                // unsuccessful transcription
                reject(null)
            } else {
                resolve(output.text)
            }
        } catch (error) {
            console.error(error)
            reject(null)
        }
    })
}

export async function computePhraseSimilarity(source: string, target: string) {
    try {
        const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
        const sourceEmbedding = await extractor(source, { pooling: 'mean', normalize: true });
        const targetEmbedding = await extractor(target, { pooling: 'mean', normalize: true });

        return computeCosineSimilarity(Array.from(sourceEmbedding.data as Float32Array), Array.from(targetEmbedding.data as Float32Array))
    } catch (error) {
        return null
    }
}