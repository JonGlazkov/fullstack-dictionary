import { BookIcon } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-secondary h-10 w-10 flex items-center justify-center rounded-md">
        <BookIcon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-md uppercase text-muted-foreground">
        Dicionário
      </span>
    </div>
  );
}
