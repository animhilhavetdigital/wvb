import React from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const defaultLogos: Logo[] = [
  { src: "/lo/logo-1.png", alt: "Client Partner 1" },
  { src: "/lo/logo-2.png", alt: "Client Partner 2" },
  { src: "/lo/logo-3.png", alt: "Client Partner 3" },
  { src: "/lo/logo-4.png", alt: "Client Partner 4" },
  { src: "/lo/logo-5.png", alt: "Air Froid Expert" },
  { src: "/lo/logo-6.png", alt: "Client Partner 6" },
  { src: "/lo/logo-7.png", alt: "Client Partner 7" },
  { src: "/lo/logo-8.png", alt: "Client Partner 8" },
  { src: "/lo/logo-9.png", alt: "Client Partner 9" },
];

export interface LogoCloudProps extends React.ComponentProps<"div"> {
  logos?: Logo[];
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
}

export function LogoCloud({
  logos = defaultLogos,
  pauseOnHover = true,
  className,
  ...props
}: LogoCloudProps) {
  // Duplicate for seamless 50% infinite translation
  const marqueeItems = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      className={cn(
        "relative w-screen left-1/2 -translate-x-1/2 overflow-hidden select-none border-y border-[#20241c]/15 py-5 sm:py-7",
        className
      )}
      {...props}
    >
      {/* Decorative corner PlusIcons at screen edges */}
      <PlusIcon
        className="pointer-events-none left-4 sm:left-10 -top-2.5 absolute z-20 size-5 text-[#20241c]/40"
        strokeWidth={1}
      />
      <PlusIcon
        className="pointer-events-none right-4 sm:right-10 -top-2.5 absolute z-20 size-5 text-[#20241c]/40"
        strokeWidth={1}
      />
      <PlusIcon
        className="pointer-events-none left-4 sm:left-10 -bottom-2.5 absolute z-20 size-5 text-[#20241c]/40"
        strokeWidth={1}
      />
      <PlusIcon
        className="pointer-events-none right-4 sm:right-10 -bottom-2.5 absolute z-20 size-5 text-[#20241c]/40"
        strokeWidth={1}
      />

      {/* Left & Right gradient edge masks for smooth feather fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-r from-[#f2efe6] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-l from-[#f2efe6] to-transparent z-10" />

      {/* Infinite scrolling track - 100% Transparent logos spanning edge-to-edge */}
      <div className="overflow-hidden">
        <div
          className={cn(
            "marquee-track flex items-center will-change-transform",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {marqueeItems.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="group mx-6 sm:mx-10 md:mx-14 flex items-center justify-center h-14 sm:h-18 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 sm:h-10 md:h-11 max-h-12 w-auto max-w-[130px] sm:max-w-[160px] object-contain select-none pointer-events-none filter grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoCloud;
