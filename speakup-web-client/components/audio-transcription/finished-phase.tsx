import { useSpeechEvalStore } from "@/lib/store"

export function FinishedPhase() {

    const { rawTranscription, phraseSimilarity } = useSpeechEvalStore((state) => ({
        rawTranscription: state.rawTrascription,
        phraseSimilarity: state.phraseSimilarity,
    }))

    return (
        <>
            {rawTranscription}
            {phraseSimilarity}
        </>
    )
}