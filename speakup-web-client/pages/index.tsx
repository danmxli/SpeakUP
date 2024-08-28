import PhraseGenerator from "@/components/phrase-generator";
import AudioRecorder from "@/components/audio-recorder";

export default function Home() {

  return (
    <main className="min-h-screen grid grid-cols-2 gap-6 p-6">
      <PhraseGenerator />
      <AudioRecorder />
    </main>
  );
}
