import { useSpeechEvalStore } from "@/lib/store"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TSpeechEvalPhase } from "@/lib/store";
import { TranscribingPhase } from "./transcribing-phase";
import { EvaluatingPhase } from "./evaluating-phase";
import { FinishedPhase } from "./finished-phase";
import React from "react";

export default function AudioTranscription() {

    const { speechEvalPhase, rawTranscription, phraseSimilarity, updateAudioBlob, updatePhase, updateRawTranscription } = useSpeechEvalStore((state) => ({
        speechEvalPhase: state.phase,
        rawTranscription: state.rawTrascription,
        phraseSimilarity: state.phraseSimilarity,
        updateAudioBlob: state.updateAudioBlob,
        updatePhase: state.updatePhase,
        updateRawTranscription: state.updateRawTranscription
    }))

    type TranscriptionPhases = {
        [key in TSpeechEvalPhase]: React.ReactNode
    }

    const curr: TranscriptionPhases = {
        new: <></>,
        transcribing: <TranscribingPhase />,
        evaulating: <EvaluatingPhase />,
        finished: <FinishedPhase />,
        error: <></>
    }

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Transcription</CardTitle>
                <CardDescription>Using model <span className="underline">Xenova/whisper-tiny.en</span></CardDescription>
                <CardContent className="grow">
                    {curr[speechEvalPhase]}
                </CardContent>
                <CardFooter>
                    <Button onClick={() => {
                        updateAudioBlob(null)
                        updatePhase("new")
                        updateRawTranscription(null)
                    }} variant="secondary">Back to audio recorder</Button>
                </CardFooter>
            </CardHeader>
        </Card>
    )
}