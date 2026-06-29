import { IsotipoMark } from "./IsotipoMark";

interface Props {
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Full Marin Propiedades lockup: isotype + wordmark.
 * Matches the official brandbook composition.
 */
export function MarinLogo({ className = "", variant = "dark" }: Props) {
  const color = variant === "light" ? "#FFFFFF" : "#0E2442";
  const accent = variant === "light" ? "#EDEDED" : "#A8A8A8";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <IsotipoMark className="h-9 w-auto" color={color} accent={accent} />
      <div className="leading-none">
        <div
          style={{ color }}
          className="text-[1.05rem] font-bold tracking-[0.04em] leading-none"
        >
          MARIN
        </div>
        <div
          style={{ color }}
          className="text-[0.52rem] font-medium tracking-[0.32em] mt-[3px] opacity-90"
        >
          PROPIEDADES
        </div>
      </div>
    </div>
  );
}
