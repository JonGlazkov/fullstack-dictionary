"use client";
import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import WordDetails from "../../(home)/_components/words-details";
import { History } from "../types";

export interface WordTableRowProps {
  data: History;
}

export default function WordsTableRow({ data }: WordTableRowProps) {
  const { data: session } = useSession();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes da palavra</span>
            </Button>
          </DialogTrigger>

          <WordDetails open={isDetailOpen} word={data.word} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>
      <TableCell className="font-mono text-xs font-medium"></TableCell>

      <TableCell className="font-medium">{data.word}</TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(data.createdAt).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </TableCell>

      {/* <TableCell>
        <Button onClick={() => {}} variant="ghost" size="sm">
          <StarOff className="mr-1 h-3 w-3 text-black" />
          Desfavoritar
        </Button>
      </TableCell> */}
    </TableRow>
  );
}
