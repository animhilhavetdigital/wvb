"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/cinematic-logo-cloud-utils/marquee";

export type LogoCloudClient = {
  name: string;
  slug?: string;
  text?: boolean;
  className?: string;
  nameClassName?: string;
  invertDark?: boolean;
};

export interface CinematicLogoCloudProps {
  clients: LogoCloudClient[];
  variant?: "grid" | "marquee" | "marquee-named";
  className?: string;
  eyebrow?: string;
  description?: string;
}

export function CinematicLogoCloud({
  clients,
  variant = "grid",
  className,
  eyebrow = "Stack Technique & Langages",
  description,
}: CinematicLogoCloudProps) {
  const renderClient = (client: LogoCloudClient, size: "lg" | "sm" = "lg") => {
    if (client.text) {
      return (
        <span
          className={cn(
            size === "lg"
              ? "text-xl font-bold text-[#0D212C]"
              : "text-sm font-semibold text-[#0D212C]",
            client.className
          )}
        >
          {client.name}
        </span>
      );
    }
    return (
      <img
        src={`https://cdn.simpleicons.org/${client.slug}`}
        alt={client.name}
        className={cn(size === "lg" ? "h-6 w-auto" : "h-5 w-auto")}
        loading="lazy"
      />
    );
  };

  if (variant === "marquee") {
    return (
      <div className={cn("w-full bg-transparent py-8 select-none", className)}>
        {eyebrow && (
          <p className="mb-6 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
            {eyebrow}
          </p>
        )}
        <Marquee speed={35}>
          {clients.map((brand) => (
            <div
              key={brand.name}
              className="flex shrink-0 items-center justify-center rounded-none border border-slate-200/90 bg-white/90 backdrop-blur-sm px-5 py-3 shadow-xs hover:border-slate-300 transition-all"
            >
              {renderClient(brand, "sm")}
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  if (variant === "marquee-named") {
    return (
      <div className={cn("w-full bg-transparent py-4 select-none", className)}>
        {eyebrow && (
          <p className="mb-5 text-center text-xs font-mono uppercase tracking-widest text-[#273C46]/80 font-medium">
            {eyebrow}
          </p>
        )}
        <Marquee speed={35}>
          {clients.map((brand) => (
            <div
              key={brand.name}
              className="flex shrink-0 items-center gap-2.5 rounded-none border border-slate-200/90 bg-white/95 px-4 py-2 shadow-xs hover:border-[#051A24]/40 hover:shadow-sm hover:scale-105 transition-all duration-200"
            >
              {brand.slug && (
                <img
                  src={`https://cdn.simpleicons.org/${brand.slug}`}
                  alt={brand.name}
                  className="size-4 shrink-0 object-contain"
                  loading="lazy"
                />
              )}
              <span
                className={cn(
                  "text-xs sm:text-sm font-semibold text-[#0D212C]",
                  brand.nameClassName
                )}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  return (
    <div className={cn("w-full bg-transparent py-8 select-none", className)}>
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
            {eyebrow}
          </p>
        )}
        {description && (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 transition-all"
        >
          {clients.map((brand) => (
            <motion.div
              key={brand.name}
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex min-w-25 items-center justify-center px-2 sm:min-w-30"
            >
              {renderClient(brand)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default CinematicLogoCloud;
