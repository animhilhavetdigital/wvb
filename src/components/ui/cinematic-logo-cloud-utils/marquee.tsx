import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  children: React.ReactNode;
}

export function Marquee({
  speed = 40,
  pauseOnHover = true,
  reverse = false,
  className,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden select-none py-2",
        className
      )}
      {...props}
    >
      {/* Edge gradient masks - fades seamlessly into white page background */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        className={cn(
          "marquee-track flex shrink-0 items-center gap-3 sm:gap-4",
          pauseOnHover && "hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">{children}</div>
      </div>
    </div>
  );
}

export default Marquee;

