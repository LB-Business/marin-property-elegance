interface Props {
  className?: string;
  variant?: "light" | "dark";
}

export function MarinLogo({ className = "", variant = "dark" }: Props) {
  const color = variant === "light" ? "#FFFFFF" : "#0E2442";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 30V11L14 2L26 11V30H17V20H11V30H2Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M14 2V11" stroke={color} strokeWidth="1.6"/>
      </svg>
      <div className="leading-none">
        <div style={{ color }} className="text-[0.78rem] font-bold tracking-[0.28em]">MARIN</div>
        <div style={{ color }} className="text-[0.6rem] font-medium tracking-[0.32em] opacity-80 mt-0.5">PROPIEDADES</div>
      </div>
    </div>
  );
}
