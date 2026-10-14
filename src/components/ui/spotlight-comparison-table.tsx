"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ComparisonPlan = {
  id: string;
  name: string;
  price: string;
  interval?: string;
  badge?: string;
  actionLabel: string;
  href?: string;
  cardClassName?: string;
  badgeClassName?: string;
  buttonClassName?: string;
};

export type ComparisonFeature = {
  id: string;
  label: string;
  values: { [planId: string]: boolean | string | number };
};

export type ComparisonGroup = {
  id: string;
  label: string;
  features: ComparisonFeature[];
};

export type SpotlightComparisonTableProps = {
  plans: ComparisonPlan[];
  groups: ComparisonGroup[];
  selectedPlanId?: string;
  defaultSelectedPlanId?: string;
  onSelectedPlanChange?: (planId: string) => void;
  differencesOnly?: boolean;
  defaultDifferencesOnly?: boolean;
  onDifferencesOnlyChange?: (value: boolean) => void;
  onChoosePlan?: (plan: ComparisonPlan) => void;
  /** Opt-in presentation loop. Selecting a plan or filter pauses it. */
  autoplay?: boolean;
  labels?: {
    caption?: string;
    features?: string;
    differences?: string;
    included?: string;
    notIncluded?: string;
    unavailable?: string;
    selectPlan?: string;
    pause?: string;
    play?: string;
    empty?: string;
    allShared?: string;
    hidden?: (count: number) => string;
  };
  className?: string;
};

function Mark({ included }: { included: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="size-3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {included ? (
        <path d="m3.5 8 3 3 6-6" />
      ) : (
        <path d="M5 8h6" />
      )}
    </svg>
  );
}

function isShared(feature: ComparisonFeature, plans: ComparisonPlan[]) {
  return (
    plans.length > 1 &&
    plans.every((plan) =>
      Object.is(feature.values[plan.id], feature.values[plans[0]!.id])
    )
  );
}

export function SpotlightComparisonTable({
  plans,
  groups,
  selectedPlanId,
  defaultSelectedPlanId,
  onSelectedPlanChange,
  differencesOnly,
  defaultDifferencesOnly = false,
  onDifferencesOnlyChange,
  onChoosePlan,
  autoplay = true,
  labels = {},
  className,
}: SpotlightComparisonTableProps) {
  const [localPlan, setLocalPlan] = React.useState(
    defaultSelectedPlanId ?? plans[1]?.id ?? plans[0]?.id ?? ""
  );
  const [localDifferences, setLocalDifferences] = React.useState(
    defaultDifferencesOnly
  );
  const [reduced, setReduced] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const pauseTimerRef = React.useRef<any>(null);
  const root = React.useRef<HTMLDivElement | null>(null);
  const stage = React.useRef<HTMLDivElement | null>(null);

  const activeId = plans.some((plan) => plan.id === (selectedPlanId ?? localPlan))
    ? selectedPlanId ?? localPlan
    : plans[0]?.id ?? "";
  const activeIndex = Math.max(
    0,
    plans.findIndex((plan) => plan.id === activeId)
  );
  const onlyDifferences = differencesOnly ?? localDifferences;
  const initialDifferences = React.useRef(onlyDifferences).current;
  const previousDifferences = React.useRef(onlyDifferences);
  const headingId = React.useId();
  const tableId = React.useId();

  const featureCount = groups.reduce(
    (sum, group) => sum + group.features.length,
    0
  );
  const sharedCount = groups.reduce(
    (sum, group) =>
      sum +
      group.features.filter((feature) => isShared(feature, plans)).length,
    0
  );

  const selectPlan = React.useCallback(
    (id: string) => {
      if (selectedPlanId === undefined) setLocalPlan(id);
      onSelectedPlanChange?.(id);
    },
    [selectedPlanId, onSelectedPlanChange]
  );

  const filterRows = React.useCallback(
    (value: boolean) => {
      if (differencesOnly === undefined) setLocalDifferences(value);
      onDifferencesOnlyChange?.(value);
    },
    [differencesOnly, onDifferencesOnlyChange]
  );

  const actions = React.useRef({ selectPlan, filterRows });
  React.useEffect(() => {
    actions.current = { selectPlan, filterRows };
  });

  // Temporarily pause autoplay on user interaction, auto-resume after 8 seconds
  const pauseTemporarily = React.useCallback(() => {
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setPaused(false);
    }, 8000);
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    const observer = new ResizeObserver(([entry]) =>
      setCompact((entry?.contentRect.width ?? 480) < 480)
    );
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  // AUTOMATED PRESENTATION LOOP (Switches plans and differences automatically)
  React.useEffect(() => {
    if (!autoplay || reduced || paused || plans.length < 2) return;

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 6;
      if (step === 0) {
        actions.current.selectPlan(plans[0]!.id);
        actions.current.filterRows(false);
      } else if (step === 1) {
        actions.current.selectPlan(plans[1]!.id);
      } else if (step === 2) {
        actions.current.filterRows(true); // Automatically turns ON "Différences uniquement"
      } else if (step === 3) {
        actions.current.selectPlan(plans[Math.min(2, plans.length - 1)]!.id);
      } else if (step === 4) {
        actions.current.filterRows(false); // Automatically turns OFF
      } else if (step === 5) {
        actions.current.selectPlan(plans[1]!.id);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [autoplay, reduced, paused, plans]);

  // FLIP row transition for differences toggle
  React.useEffect(() => {
    const viewport = stage.current;
    const table = viewport?.querySelector("table");
    if (!viewport || !table) return;
    const rows = Array.from(
      table.querySelectorAll("tr[data-layout-row]")
    ) as HTMLTableRowElement[];
    const shared = rows.filter((row) => row.dataset.shared === "true");
    const changed = previousDifferences.current !== onlyDifferences;
    previousDifferences.current = onlyDifferences;
    let live = true;
    const animations: Animation[] = [];

    const finish = () => {
      rows.forEach((row) => {
        row.hidden = onlyDifferences && row.dataset.shared === "true";
        row.removeAttribute("style");
        Array.from(row.cells).forEach((cell) =>
          cell.style.removeProperty("width")
        );
      });
      viewport.style.removeProperty("height");
    };

    if (reduced || !changed || typeof viewport.animate !== "function") {
      finish();
      return;
    }

    queueMicrotask(() => {
      if (!live) return;
      const oldHeight = viewport.getBoundingClientRect().height;
      const tableTop = table.getBoundingClientRect().top;
      const before = rows.map((row) => ({
        row,
        box: row.getBoundingClientRect(),
        widths: Array.from(row.cells).map(
          (cell) => cell.getBoundingClientRect().width
        ),
      }));

      if (onlyDifferences) {
        before
          .filter(({ row }) => shared.includes(row))
          .forEach(({ row, box, widths }) => {
            Array.from(row.cells).forEach((cell, i) => {
              cell.style.width = `${widths[i]}px`;
            });
            Object.assign(row.style, {
              position: "absolute",
              top: `${box.top - tableTop}px`,
              left: "0",
              width: "100%",
              display: "table",
              tableLayout: "fixed",
            });
          });
      } else {
        shared.forEach((row) => {
          row.hidden = false;
        });
      }

      const finalHeight = table.getBoundingClientRect().height;
      const finalTop = table.getBoundingClientRect().top;
      const timing = {
        duration: 380,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both" as FillMode,
      };

      before
        .filter(({ row }) => !shared.includes(row))
        .forEach(({ row, box }) => {
          const delta =
            box.top - tableTop - (row.getBoundingClientRect().top - finalTop);
          if (Math.abs(delta) > 0.5)
            animations.push(
              row.animate(
                [
                  { transform: `translateY(${delta}px)` },
                  { transform: "translateY(0)" },
                ],
                timing
              )
            );
        });

      shared.forEach((row) => {
        if (onlyDifferences) {
          row.querySelectorAll("[data-row-content]").forEach((content) => {
            animations.push(
              content.animate(
                [
                  {
                    height: `${content.getBoundingClientRect().height}px`,
                    opacity: 1,
                  },
                  { height: "0px", opacity: 0 },
                ],
                timing
              )
            );
          });
        } else {
          animations.push(
            row.animate(
              [{ opacity: 0, transform: "scaleY(0)" }, { opacity: 1, transform: "scaleY(1)" }],
              timing
            )
          );
        }
      });

      viewport.style.height = `${finalHeight}px`;
      animations.push(
        viewport.animate(
          [{ height: `${oldHeight}px` }, { height: `${finalHeight}px` }],
          timing
        )
      );

      Promise.all(
        animations.map((animation) => animation.finished.catch(() => undefined))
      ).then(() => {
        if (live) {
          finish();
          animations.forEach((animation) => animation.cancel());
        }
      });
    });

    return () => {
      live = false;
      animations.forEach((animation) => animation.cancel());
      finish();
    };
  }, [onlyDifferences, reduced, compact, groups, plans]);

  // Spotlight flare animation
  React.useEffect(() => {
    if (reduced || !root.current) return;
    let live = true;
    const animations: Animation[] = [];

    queueMicrotask(() => {
      if (!live || !root.current) return;
      const cells = Array.from(
        root.current.querySelectorAll("[data-cell-plan]")
      ) as HTMLElement[];
      cells
        .filter(
          (cell) =>
            cell.dataset.cellPlan === activeId && !cell.closest("tr")?.hidden
        )
        .forEach((cell, i) => {
          const content = cell.querySelector("[data-value]");
          if (content && typeof content.animate === "function")
            animations.push(
              content.animate(
                [
                  { opacity: 0.4, transform: "translateY(2px) scale(0.95)" },
                  { opacity: 1, transform: "translateY(0) scale(1)" },
                ],
                {
                  duration: 250,
                  delay: i * 35,
                  fill: "backwards",
                  easing: "ease-out",
                }
              )
            );
        });
    });

    return () => {
      live = false;
      animations.forEach((animation) => animation.cancel());
    };
  }, [activeId, reduced, groups, plans]);

  const choose = (id: string) => {
    pauseTemporarily();
    selectPlan(id);
  };

  const planVisibility = (id: string) =>
    id === activeId ? "" : "hidden md:table-cell";

  return (
    <div
      ref={root}
      data-slot="spotlight-comparison-table"
      data-selected-plan={activeId}
      data-differences={onlyDifferences}
      className={cn(
        "w-full min-w-0 text-[#051A24] select-none",
        className
      )}
    >
      <div className="overflow-hidden rounded-none border border-slate-200/90 bg-white shadow-xl">
        {/* Top bar with auto status and Differences Switch */}
        <div className="flex flex-col sm:flex-row sm:min-h-12 sm:items-center justify-between gap-2.5 border-b border-slate-200/80 bg-slate-50/80 px-3 sm:px-4 py-2.5 sm:py-2">
          <div className="flex items-center justify-between sm:justify-start gap-2.5">
            <p id={headingId} className="truncate text-xs font-semibold text-[#0D212C]">
              {labels.caption ?? "Comparatif des offres"}
            </p>
            {autoplay && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-emerald-100/80 border border-emerald-300/60 text-[10px] font-mono text-emerald-800">
                <span className="size-1.5 rounded-none bg-emerald-500 animate-pulse" />
                {paused ? "Pause" : "Démo auto"}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5">
            {autoplay && (
              <button
                type="button"
                onClick={() => setPaused(!paused)}
                aria-label={paused ? "Reprendre automatique" : "Mettre en pause"}
                title={paused ? "Reprendre l'animation" : "Pause"}
                className="flex size-7 items-center justify-center rounded-none bg-white border border-slate-200 text-slate-600 hover:text-[#051A24] hover:bg-slate-100 transition-colors shadow-xs"
              >
                {paused ? (
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3" fill="currentColor">
                    <path d="m5 3 8 5-8 5z" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3" fill="currentColor">
                    <path d="M4 3h3v10H4zM9 3h3v10H9z" />
                  </svg>
                )}
              </button>
            )}

            {/* HIGH-CONTRAST AUTOMATED DIFFERENCES SWITCH */}
            <button
              type="button"
              role="switch"
              aria-checked={onlyDifferences}
              aria-controls={tableId}
              onClick={() => {
                pauseTemporarily();
                filterRows(!onlyDifferences);
              }}
              className="flex items-center gap-2 rounded-none bg-white px-2.5 sm:px-3 py-1.5 border border-slate-200 shadow-xs text-[11px] font-medium text-[#0D212C] hover:bg-slate-50 transition-all active:scale-98"
            >
              <span>{labels.differences ?? "Différences uniquement"}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-5 w-9 items-center rounded-none p-0.5 transition-colors duration-300",
                  onlyDifferences
                    ? "bg-[#051A24]"
                    : "bg-slate-200 ring-1 ring-inset ring-slate-300"
                )}
              >
                <span
                  className={cn(
                    "size-4 rounded-none bg-white shadow-md transition-transform duration-300",
                    onlyDifferences ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {plans.length > 0 ? (
          <>
            {/* Mobile plan switcher tabs */}
            <div
              role="radiogroup"
              aria-label={labels.selectPlan ?? "Select a plan"}
              className="flex md:hidden gap-1.5 border-b border-slate-200 bg-slate-50/80 p-2"
            >
              {plans.map((plan) => {
                const isSelected = plan.id === activeId;
                return (
                  <button
                    type="button"
                    role="radio"
                    key={plan.id}
                    aria-checked={isSelected}
                    onClick={() => choose(plan.id)}
                    className={cn(
                      "min-w-0 flex-1 flex flex-col items-center justify-center rounded-none px-1.5 py-2 text-xs transition-all",
                      isSelected
                        ? plan.id === "business"
                          ? "bg-[#051A24] text-white shadow-md font-bold"
                          : plan.id === "elite"
                          ? "bg-[#FFF6E5] text-[#1E1B18] border border-amber-300 shadow-xs font-bold"
                          : "bg-[#EEF4F8] text-[#0F172A] border border-slate-300 shadow-xs font-bold"
                        : "text-slate-600 hover:bg-slate-100 font-medium"
                    )}
                  >
                    <span className="truncate w-full text-center text-[11px]">{plan.name}</span>
                    <span
                      className={cn(
                        "text-[10px] mt-0.5 font-mono",
                        isSelected
                          ? plan.id === "business"
                            ? "text-[#d5e14e]"
                            : "text-slate-800"
                          : "text-slate-400"
                      )}
                    >
                      {plan.price}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Stage */}
            <div ref={stage} className="relative isolate overflow-hidden">
              {/* DYNAMIC SPOTLIGHT COLUMN INDICATOR */}
              <div
                aria-hidden="true"
                data-spotlight
                style={
                  {
                    "--spotlight-index": activeIndex,
                  } as React.CSSProperties
                }
                className={cn(
                  "pointer-events-none absolute inset-y-0 z-0 rounded-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border-x",
                  "left-[52%] w-[48%] translate-x-0 md:left-[34%] md:w-[22%] md:translate-x-[calc(var(--spotlight-index)*100%)]",
                  activeId === "business"
                    ? "bg-[#051A24]/[0.04] border-[#051A24]/20"
                    : activeId === "elite"
                    ? "bg-amber-500/[0.05] border-amber-400/30"
                    : "bg-blue-500/[0.04] border-blue-400/25"
                )}
              >
                {/* Glowing Top Flare on Active Column */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1.5 shadow-sm",
                    activeId === "business"
                      ? "bg-[#d5e14e]"
                      : activeId === "elite"
                      ? "bg-amber-400"
                      : "bg-blue-500"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent",
                    activeId === "business"
                      ? "from-[#d5e14e]/10"
                      : activeId === "elite"
                      ? "from-amber-400/10"
                      : "from-blue-400/10"
                  )}
                />
              </div>

              {/* Table */}
              <table
                id={tableId}
                aria-labelledby={headingId}
                className="relative z-10 w-full table-fixed border-collapse text-[11px]"
              >
                <colgroup>
                  <col className="w-[52%] md:w-[34%]" />
                  {plans.map((plan) => (
                    <col
                      key={plan.id}
                      className={cn(
                        plan.id === activeId
                          ? "w-[48%] md:w-[22%]"
                          : "hidden md:table-column md:w-[22%]"
                      )}
                    />
                  ))}
                </colgroup>

                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-4 pb-4 pt-3 text-left align-bottom font-normal"
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {labels.features ?? "Fonctionnalités"}
                      </span>
                      <span
                        aria-live="polite"
                        className="mt-1 block text-[10px] font-mono text-slate-400"
                      >
                        {onlyDifferences
                          ? featureCount - sharedCount
                          : featureCount}{" "}
                        / {featureCount}
                      </span>
                    </th>

                    {/* PACK HEADERS WITH DISTINCT, RICH COLORS */}
                    {plans.map((plan) => {
                      const isSelected = activeId === plan.id;
                      return (
                        <th
                          key={plan.id}
                          scope="col"
                          data-plan-header={plan.id}
                          className={cn(
                            "p-2 text-left align-top font-normal",
                            planVisibility(plan.id)
                          )}
                        >
                          <div
                            className={cn(
                              "rounded-none p-3 sm:p-4 transition-all duration-300 flex flex-col justify-between min-h-[148px] border",
                              plan.cardClassName ??
                                (plan.id === "business"
                                  ? "bg-[#051A24] text-white border-[#0D212C] shadow-lg ring-2 ring-[#051A24]/20"
                                  : plan.id === "elite"
                                  ? "bg-[#FFF6E5] text-[#1E1B18] border-amber-300/80 shadow-sm"
                                  : "bg-[#EEF4F8] text-[#0F172A] border-slate-200/90 shadow-sm")
                            )}
                          >
                            <div>
                              <div className="mb-2 flex h-4 items-center">
                                {plan.badge && (
                                  <span
                                    className={cn(
                                      "truncate text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none",
                                      plan.badgeClassName ??
                                        (plan.id === "business"
                                          ? "bg-[#d5e14e] text-[#051A24]"
                                          : plan.id === "elite"
                                          ? "bg-amber-200 text-amber-950 border border-amber-300"
                                          : "bg-slate-200 text-slate-800")
                                    )}
                                  >
                                    {plan.badge}
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                data-select-plan={plan.id}
                                aria-pressed={isSelected}
                                onClick={() => choose(plan.id)}
                                className="rounded-none text-xs sm:text-sm font-bold text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {plan.name}
                              </button>
                              <div className="mb-3 mt-1 flex flex-wrap items-baseline gap-x-1">
                                <span className="text-[20px] sm:text-[24px] font-extrabold leading-tight tracking-tight">
                                  {plan.price}
                                </span>
                                <span
                                  className={cn(
                                    "text-[10px]",
                                    plan.id === "business"
                                      ? "text-slate-300"
                                      : "text-slate-500"
                                  )}
                                >
                                  {plan.interval}
                                </span>
                              </div>
                            </div>

                            {plan.href ? (
                              <a
                                href={plan.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-plan-action={plan.id}
                                onClick={() => {
                                  pauseTemporarily();
                                  onChoosePlan?.(plan);
                                }}
                                className={cn(
                                  "flex h-8 w-full items-center justify-center gap-1.5 rounded-none px-2 text-[11px] font-bold transition-all shadow-sm active:scale-98",
                                  plan.buttonClassName ??
                                    (plan.id === "business"
                                      ? "bg-[#d5e14e] text-[#051A24] hover:bg-[#c6d23f] shadow-[#d5e14e]/20"
                                      : plan.id === "elite"
                                      ? "bg-[#1E1B18] text-[#FFF6E5] hover:bg-black"
                                      : "bg-white text-[#0F172A] border border-slate-200 hover:bg-slate-50")
                                )}
                              >
                                <span>{plan.actionLabel}</span>
                                <svg
                                  aria-hidden="true"
                                  viewBox="0 0 16 16"
                                  className="size-3 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                >
                                  <path d="M4 12 12 4M4 4h8v8" />
                                </svg>
                              </a>
                            ) : (
                              <button
                                type="button"
                                data-plan-action={plan.id}
                                onClick={() => {
                                  choose(plan.id);
                                  onChoosePlan?.(plan);
                                }}
                                className={cn(
                                  "flex h-8 w-full items-center justify-center gap-1.5 rounded-none px-2 text-[11px] font-bold transition-all shadow-sm active:scale-98",
                                  plan.buttonClassName ??
                                    (plan.id === "business"
                                      ? "bg-[#d5e14e] text-[#051A24] hover:bg-[#c6d23f]"
                                      : plan.id === "elite"
                                      ? "bg-[#1E1B18] text-[#FFF6E5] hover:bg-black"
                                      : "bg-white text-[#0F172A] border border-slate-200 hover:bg-slate-50")
                                )}
                              >
                                <span>{plan.actionLabel}</span>
                                <svg
                                  aria-hidden="true"
                                  viewBox="0 0 16 16"
                                  className="size-3 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                >
                                  <path d="M4 12 12 4M4 4h8v8" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {groups.map((group) => {
                  const hiddenCount = group.features.filter((feature) =>
                    isShared(feature, plans)
                  ).length;
                  return (
                    <tbody key={group.id}>
                      <tr
                        data-layout-row
                        data-group-row={group.id}
                        className="relative"
                      >
                        <th
                          scope="rowgroup"
                          colSpan={compact ? 2 : plans.length + 1}
                          className="h-8 border-y border-slate-200 bg-slate-100/90 px-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#051A24]"
                        >
                          <span className="flex items-center gap-2">
                            {group.label}
                            {onlyDifferences && hiddenCount > 0 && (
                              <span
                                data-hidden-count={hiddenCount}
                                className="rounded-none bg-white px-2 py-0.5 text-[9px] font-normal tracking-normal border border-slate-300 text-slate-600"
                              >
                                {labels.hidden?.(hiddenCount) ??
                                  `${hiddenCount} masquées`}
                              </span>
                            )}
                          </span>
                        </th>
                      </tr>

                      {group.features.map((feature) => {
                        const shared = isShared(feature, plans);
                        return (
                          <tr
                            key={feature.id}
                            data-layout-row
                            data-feature-row={feature.id}
                            data-shared={shared}
                            hidden={initialDifferences && shared}
                            aria-hidden={onlyDifferences && shared ? true : undefined}
                            className="origin-top border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                          >
                            <th
                              scope="row"
                              className="p-0 text-left font-normal"
                            >
                              <div
                                data-row-content
                                className="flex min-h-9 sm:h-8 items-center overflow-hidden px-3 sm:px-4 py-1"
                              >
                                <span
                                  className="text-[10.5px] sm:text-[11px] font-medium text-slate-700 leading-tight line-clamp-2"
                                  title={feature.label}
                                >
                                  {feature.label}
                                </span>
                              </div>
                            </th>

                            {plans.map((plan) => {
                              const value = feature.values[plan.id];
                              const isPlanActive = plan.id === activeId;
                              return (
                                <td
                                  key={plan.id}
                                  data-cell-plan={plan.id}
                                  className={cn(
                                    "p-0 text-center",
                                    planVisibility(plan.id)
                                  )}
                                >
                                  <div
                                    data-row-content
                                    className="relative flex min-h-9 sm:h-8 items-center justify-center overflow-hidden px-2 py-1"
                                  >
                                    <span
                                      data-value
                                      className={cn(
                                        "relative inline-flex min-w-0 items-center justify-center text-center",
                                        isPlanActive
                                          ? "font-bold text-[#051A24]"
                                          : "text-slate-600"
                                      )}
                                    >
                                      {typeof value === "boolean" ? (
                                        value ? (
                                          <span
                                            className={cn(
                                              "flex size-5 items-center justify-center rounded-none text-white shadow-xs",
                                              plan.id === "business"
                                                ? "bg-[#051A24]"
                                                : plan.id === "elite"
                                                ? "bg-amber-600"
                                                : "bg-emerald-600"
                                            )}
                                          >
                                            <Mark included={true} />
                                          </span>
                                        ) : (
                                          <span className="flex size-5 items-center justify-center rounded-none bg-slate-100 text-slate-300">
                                            <Mark included={false} />
                                          </span>
                                        )
                                      ) : (
                                        <span
                                          className={cn(
                                            "text-[10.5px] sm:text-[11px] leading-tight px-1",
                                            isPlanActive && "font-semibold text-[#051A24]"
                                          )}
                                        >
                                          {value ?? (labels.unavailable ?? "—")}
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  );
                })}
              </table>
            </div>

            {onlyDifferences && sharedCount === featureCount && (
              <p
                role="status"
                className="p-5 text-center text-xs text-slate-500"
              >
                {labels.allShared ??
                  "Ces 3 packs partagent toutes les fonctionnalités listées."}
              </p>
            )}
          </>
        ) : (
          <p
            role="status"
            className="p-6 text-center text-sm text-slate-500"
          >
            {labels.empty ?? "Aucun pack à comparer."}
          </p>
        )}
      </div>
    </div>
  );
}

export default SpotlightComparisonTable;
