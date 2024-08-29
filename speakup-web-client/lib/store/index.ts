import { create } from "zustand";

export type TSpeechEvalPhase = "new" | "transcribing" | "evaulating" | "finished"

type SpeechEvalState = {
    phase: TSpeechEvalPhase;
    audioBlob: Blob | null | undefined;
}

type SpeechEvalAction = {
    updatePhase: (phase: SpeechEvalState['phase']) => void;
    updateAudioBlob: (audioBlob: SpeechEvalState['audioBlob']) => void;
}

export const useSpeechEvalStore = create<SpeechEvalState & SpeechEvalAction>((set) => ({
    audioBlob: null,
    phase: "new",
    updateAudioBlob: (target) => set(() => ({ audioBlob: target })),
    updatePhase: (newPhase) => set(() => ({ phase: newPhase }))
}))