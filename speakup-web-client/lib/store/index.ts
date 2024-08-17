import { create } from "zustand";
import { TSpeechEvaluation } from "@/types/evaluation";

export type TSpeechEvalPhase = "new" | "finished"

type SpeechEvalState = {
    phase: TSpeechEvalPhase
    mediaUrl: string | undefined
    data: TSpeechEvaluation | undefined
}

type SpeechEvalAction = {
    updatePhase: (phase: SpeechEvalState['phase']) => void;
    updateMediaUrl: (mediaUrl: SpeechEvalState['mediaUrl']) => void;
    updateData: (data: SpeechEvalState['data']) => void;
}

export const useSpeechEvalStore = create<SpeechEvalState & SpeechEvalAction>((set) =>({
    phase: "new",
    mediaUrl: undefined,
    data: undefined,
    updatePhase: (target) => set(() => ({phase: target})),
    updateMediaUrl: (target) => set(() =>({mediaUrl: target})),
    updateData: (target) => set(() => ({data: target}))
}))