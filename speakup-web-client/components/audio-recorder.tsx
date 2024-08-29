import { Button } from "@/components/ui/button";
import { formatAudioTimestamp, getMimeType, webmFixDuration } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { GiOldMicrophone } from "react-icons/gi";
import { FiLoader } from "react-icons/fi";
import { useSpeechEvalStore } from "@/lib/store";

export default function AudioRecorder() {

    const { audioBlob, updateAudioBlob, updateSpeechEvalPhase } = useSpeechEvalStore((state) => ({
        audioBlob: state.audioBlob,
        updateAudioBlob: state.updateAudioBlob,
        updateSpeechEvalPhase: state.updatePhase
    }))

    const [recording, setRecording] = useState(false)
    const [duration, setDuration] = useState(0);

    const streamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
        // Reset recording (if any)
        updateAudioBlob(null);

        let startTime = Date.now();

        try {
            if (!streamRef.current) {
                streamRef.current = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
            }

            const mimeType = getMimeType();
            const mediaRecorder = new MediaRecorder(streamRef.current, {
                mimeType,
            });

            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.addEventListener("dataavailable", async (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
                if (mediaRecorder.state === "inactive") {
                    const duration = Date.now() - startTime;

                    // Received a stop event
                    let blob = new Blob(chunksRef.current, { type: mimeType });

                    if (mimeType === "audio/webm") {
                        blob = await webmFixDuration(blob, duration, blob.type);
                    }

                    updateAudioBlob(blob);

                    chunksRef.current = [];
                }
            });
            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state === "recording"
        ) {
            mediaRecorderRef.current.stop(); // set state to inactive
            setDuration(0);
            setRecording(false);
        }
    };

    useEffect(() => {
        let stream: MediaStream | null = new MediaStream();

        if (recording) {
            const timer = setInterval(() => {
                setDuration((prevDuration) => prevDuration + 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [recording]);

    const handleToggleRecording = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
    };


    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Button onClick={handleToggleRecording} className="rounded-full h-48 w-48 flex flex-col">
                {recording ? (
                    <>
                        <FiLoader className="h-16 w-16 animate-spin" />{`Stop recording (${formatAudioTimestamp(duration)})`}
                    </>
                ) : (
                    <>
                        <GiOldMicrophone className="h-16 w-16" />Start recording
                    </>
                )}
            </Button>

            {audioBlob && (
                <>
                    <audio className="w-full" ref={audioRef} controls>
                        <source
                            src={URL.createObjectURL(audioBlob)}
                            type={audioBlob.type}
                        />
                    </audio>
                    <div className="w-full flex justify-center gap-6">
                        <Button
                            onClick={async () => {
                            }}
                        >Evaluate Speech</Button>
                        <Button variant="outline">Model Settings</Button>
                    </div>
                </>
            )}
        </div>
    )
}