import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WordDetailsProps {
  word?: string;
  open?: boolean;
}

export default function WordDetails({ word }: WordDetailsProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Palavra: {word}</DialogTitle>
        <DialogDescription>Detalhes da palavra</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
