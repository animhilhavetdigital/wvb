import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, ...props }, ref) => {
    const handleClick = () => {
      onCheckedChange?.(!checked)
    }

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        ref={ref}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-none border border-[#051A24]/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-[#051A24] dark:bg-white" : "bg-[#e5e0d3] dark:bg-zinc-800",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-none shadow-none transition-transform",
            checked
              ? "translate-x-6 bg-white dark:bg-[#051A24]"
              : "translate-x-1 bg-[#051A24] dark:bg-zinc-300"
          )}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
