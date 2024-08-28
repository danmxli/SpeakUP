import { create } from "zustand";

type SpeechEvalState = {
    audioBlob: Blob | null | undefined;
}

type SpeechEvalAction = {
    updateAudioBlob: (audioBlob: SpeechEvalState['audioBlob']) => void;
}

export const useSpeechEvalStore = create<SpeechEvalState & SpeechEvalAction>((set) =>({
    audioBlob: null,
    updateAudioBlob: (target) => set(() => ({audioBlob: target}))
}))