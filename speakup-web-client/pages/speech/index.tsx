import { TSpeechEvalPhase, useSpeechEvalStore } from "@/lib/store"
import UploadSpeechAudio from "@/components/speech/uploadFile"
import ViewSpeechEvaluation from "@/components/speech/viewEvaluation"

export default function SpeechPage() {
    const phase = useSpeechEvalStore((state) => state.phase)

    type PagePhases = {
        [key in TSpeechEvalPhase]: React.ReactNode
    }

    const curr: PagePhases = {
        new: <UploadSpeechAudio />,
        finished: <ViewSpeechEvaluation />
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center`}
        >
            {curr[phase]}
        </main>
    )
}