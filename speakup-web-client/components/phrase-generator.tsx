import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { FiLoader, FiGlobe } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { useSpeechEvalStore } from "@/lib/store";

export default function PhraseGenerator() {

    const { sourcePhrase, updateSourcePhrase } = useSpeechEvalStore((state) => ({
        sourcePhrase: state.sourcePhrase,
        updateSourcePhrase: state.updateSourcePhrase
    }))
    const [lang, setLang] = useState<string>("en");
    const [wordCount, setWordCount] = useState(10);
    const [generating, setGenerating] = useState(false);
    const langArr = [{ code: "en", name: "English" }, { code: "zh", name: "Chinese (Simplified)" }, { code: "it", name: "Italian" }, { code: "es", name: "Spanish" }, { code: "de", name: "German" }, { code: "fr", name: "French (Standard)" }]

    useEffect(() => {
        async function genPhrase(wordCount: number): Promise<string | undefined> {
            let url = new URL("https://random-word-api.herokuapp.com/word")
            url.searchParams.append("number", wordCount.toString())

            try {
                const res = await fetch(url);
                if (!res.ok) {
                    return
                }
                const words = await res.json() as string[]
                updateSourcePhrase(words.join(" "))
            } catch (error) {

            }
        }

        genPhrase(10)
    }, [updateSourcePhrase])

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>SpeakUP</CardTitle>
                <CardDescription>Unprejudiced speech and human presentation evaluation.</CardDescription>
            </CardHeader>
            <CardContent className="grow">
                <Label>1: Record how you would read outloud the phrase below.</Label>
                <br />
                <Label>2: Submit your audio to be processed and (optionally) select a model to perform the transcription.</Label>
                <br /><br />
                <p>
                    {sourcePhrase}
                </p>
            </CardContent>
            <CardFooter className="gap-3">
                <Button
                    onClick={async () => {
                        let url = new URL("https://random-word-api.herokuapp.com/word")
                        if (lang !== "en") {
                            url.searchParams.append("lang", lang)
                        }
                        url.searchParams.append("number", wordCount.toString())

                        try {
                            setGenerating(true)
                            const res = await fetch(url);
                            if (!res.ok) {
                                setGenerating(false)
                                // TODO error toast
                                return
                            }
                            const words = await res.json() as string[]
                            updateSourcePhrase(words.join(" "))
                            setGenerating(false)
                        } catch (error) {
                            // TODO error toast
                            setGenerating(false)
                        }
                    }}
                    className="w-40"
                    variant="secondary"
                    disabled={generating || wordCount < 1}
                >
                    {generating ? (
                        <>
                            <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                            Generating
                        </>
                    ) : (
                        <>
                            Regenerate phrase
                        </>
                    )}
                </Button>
                <Label htmlFor="quantity">Word count</Label>
                <Input type="number" id="quantity" defaultValue={wordCount} min={1} className="w-fit" onChange={(e) => setWordCount(Number(e.target.value))} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <FiGlobe className="mr-2 h-4 w-4" />{lang}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
                            {langArr.map(item => <DropdownMenuRadioItem key={item.code} value={item.code}>{item.name}</DropdownMenuRadioItem>)}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    )
}