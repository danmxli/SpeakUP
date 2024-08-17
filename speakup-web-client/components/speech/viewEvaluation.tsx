import { useRouter } from "next/router";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useSpeechEvalStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function ViewSpeechEvaluation() {
    const router = useRouter();
    const { mediaUrl, data } = useSpeechEvalStore((state) => ({
        mediaUrl: state.mediaUrl,
        data: state.data,
    }));

    return (
        <Card className="w-2/3 mx-auto">
            <CardHeader>
                <audio controls src={mediaUrl} className="w-full">
                    Your browser does not support the audio element.
                </audio>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 rounded-md border">
                    {data ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Metric</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(data).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <Label>{formatLabel(key)}</Label>
                                        </TableCell>
                                        <TableCell>{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : null}
                </ScrollArea>
            </CardContent>
            <CardFooter className="gap-3">
                <Button onClick={() => {

                }}>
                    New speech
                </Button>
                <Button onClick={() => router.push("/")} variant="secondary">Go back</Button>
            </CardFooter>
        </Card>
    );
}

function formatLabel(label: string): string {
    return label
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}
