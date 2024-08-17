import { useRouter } from "next/router";
import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { FiLoader } from "react-icons/fi";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TSpeechEvaluation } from "@/types/evaluation";
import { useSpeechEvalStore } from "@/lib/store";

export default function UploadSpeechAudio() {
    const router = useRouter()
    const {
        updatePhase,
        updateMediaUrl,
        updateData,
        mediaUrl
    } = useSpeechEvalStore((state) => ({
        updatePhase: state.updatePhase,
        updateMediaUrl: state.updateMediaUrl,
        updateData: state.updateData,
        mediaUrl: state.mediaUrl
    }))

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : null;
        
        if (file && file.type.startsWith("audio/")) {
            const url = URL.createObjectURL(file);
            updateMediaUrl(url);
            console.log("Audio URL created: ", url);
        } else {
            updateMediaUrl(undefined)
            setSelectedFile(null)
            console.error("Selected file is not a valid audio file");
        }
        setSelectedFile(file);
    }

    const handleFileSubmit = async () => {

        if (!selectedFile) {
            return
        }

        const formData = new FormData();
        formData.append("file_binary", selectedFile);

        try {
            setIsLoading(true)
            const response = await fetch(`http://127.0.0.1:8080/api/v1/evaluate-speech/`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload file");
            }
            const data = await response.json() as TSpeechEvaluation;
            updateData(data)
            updatePhase("finished")
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-fit sm:w-96">
            <CardHeader>
                {isLoading ? (
                    <Button disabled>
                        <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                        Processing audio file
                    </Button>
                ) : (
                    <>
                        <Label htmlFor="speech">Speech Audio File</Label>
                        <div className="flex flex-row gap-3">
                            <Input id="speech" type="file" onChange={handleFileChange} />
                            <Button disabled={!selectedFile} onClick={handleFileSubmit}>
                                Submit
                            </Button>
                        </div>
                    </>
                )}
            </CardHeader>
            <CardFooter>
                <Button onClick={() => router.push("/")} variant="secondary">Go back</Button>
            </CardFooter>
        </Card>
    )
}