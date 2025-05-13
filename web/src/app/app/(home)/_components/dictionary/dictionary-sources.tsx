import { ExternalLink } from "lucide-react";

type DictionarySourcesProps = {
  sourceUrls: string[];
};

export function DictionarySources({ sourceUrls }: DictionarySourcesProps) {
  if (!sourceUrls || sourceUrls.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Fonte</h3>
      {sourceUrls.map((url, index) => (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          {url}
          <ExternalLink size={14} />
        </a>
      ))}
    </div>
  );
}
