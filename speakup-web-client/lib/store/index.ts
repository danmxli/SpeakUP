import { create } from "zustand";

export type TSpeechEvalPhase = "new" | "transcribing" | "evaulating" | "finished" | "error"

type SpeechEvalState = {
    phase: TSpeechEvalPhase;
    sourcePhrase: string | null | undefined;
    audioBlob: Blob | null | undefined;
    rawTrascription: string | null | undefined;
    phraseSimilarity: number | null | undefined;
}

type SpeechEvalAction = {
    updatePhase: (phase: SpeechEvalState['phase']) => void;
    updateSourcePhrase: (sourcePhrase: SpeechEvalState['sourcePhrase']) => void;
    updateAudioBlob: (audioBlob: SpeechEvalState['audioBlob']) => void;
    updateRawTranscription: (rawTranscription: SpeechEvalState['rawTrascription']) => void;
    updatePhraseSimilarity: (phraseSimilarity: SpeechEvalState['phraseSimilarity']) => void;
}

export const useSpeechEvalStore = create<SpeechEvalState & SpeechEvalAction>((set) => ({
    phase: "new",
    sourcePhrase: null,
    audioBlob: null,
    rawTrascription: null,
    phraseSimilarity: null,
    updatePhase: (newPhase) => set(() => ({ phase: newPhase })),
    updateSourcePhrase: (target) => set(() => ({sourcePhrase: target})),
    updateAudioBlob: (target) => set(() => ({ audioBlob: target })),
    updateRawTranscription: (target) => set(() => ({ rawTrascription: target })),
    updatePhraseSimilarity: (target) => set(() => ({ phraseSimilarity: target }))
}))