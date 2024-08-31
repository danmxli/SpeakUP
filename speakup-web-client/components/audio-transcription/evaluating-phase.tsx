import { useSpeechEvalStore } from "@/lib/store"

export function EvaluatingPhase() {
    const rawTranscription = useSpeechEvalStore((state) => state.rawTrascription)

    return (
        <>
            {rawTranscription}
            Evaluating transcription.
        </>
    )
}