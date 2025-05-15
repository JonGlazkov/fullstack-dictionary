"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function LeftSide() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted text-muted-foreground">
          <div className="relative flex size-full items-center gap-3 bg-background-secondary text-lg font-medium text-foreground">
            <Image
              src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc"
              alt="Dictionary"
              width={1000}
              height={1000}
              className="min-h-full w-full bg-transparent object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
