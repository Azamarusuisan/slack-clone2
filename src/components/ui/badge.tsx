import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border bg-background px-2 py-0.5 text-xs leading-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
