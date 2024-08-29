import PhraseGenerator from "@/components/phrase-generator";
import AudioRecorder from "@/components/audio-recorder";
import { useSpeechEvalStore } from "@/lib/store";
import AudioTranscription from "@/components/audio-transcription";

export default function Home() {

  const speechEvalPhase = useSpeechEvalStore((state) => state.phase)

  return (
    <main className="min-h-screen grid grid-cols-2 gap-6 p-6">
      <PhraseGenerator />
      {speechEvalPhase === "new" ? (
        <AudioRecorder />
      ) : (
        <AudioTranscription />
      )}
    </main>
  );
}
