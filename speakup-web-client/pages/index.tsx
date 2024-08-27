import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { GiOldMicrophone } from "react-icons/gi";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center`}
    >
      <Dialog>
        <Card className="w-fit sm:w-96">
          <CardHeader>
            <CardTitle>SpeakUP</CardTitle>
            <CardDescription>Unprejudiced speech and human presentation evaluation.</CardDescription>
          </CardHeader>
          <CardContent>
            <DialogTrigger className="flex flex-row items-center gap-3">
              <GiOldMicrophone className="size-16" />
              <code>README.md</code>
            </DialogTrigger>
          </CardContent>
          <CardFooter className="gap-3">
            <Button onClick={() => {}}>Begin Evaluation</Button>
          </CardFooter>
        </Card>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note from the author</DialogTitle>
            <DialogDescription>
              Privacy: we do not outsource your digital footprint to any third party database.
              <br /><br />
              Credits: TODO.
              <br /><br />
              I intend to make this a free tool that people can use at their convenience. No API metering and billing.
              <br /><br />
              You can check out the <a href="https://github.com/danmxli/SpeakUP" target="_blank" className="underline">source code here.</a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
