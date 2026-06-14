"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  teams: { teamId: string; teamName: string }[];
  currentTeamId: string | null;
};

export function InventoryTeamFilter({ teams, currentTeamId }: Props) {
  const baseHref = "/dashboard/inventory";

  if (teams.length <= 1) return null;

  return (
    <div
      className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-border/60 bg-muted/30 p-1"
      role="group"
      aria-label="Filter by team"
    >
      <Link
        href={baseHref}
        className={cn(
          "rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
          currentTeamId === null
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </Link>
      {teams.map((t) => {
        const isActive = currentTeamId === t.teamId;
        return (
          <Link
            key={t.teamId}
            href={`${baseHref}?teamId=${t.teamId}`}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.teamName}
          </Link>
        );
      })}
    </div>
  );
}
