interface Props {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

/** Architectural isotype — a stylized building outline used as a decorative motif. */
export function IsotipoMark({ className = "", stroke = "currentColor", strokeWidth = 1 }: Props) {
  return (
    <svg viewBox="0 0 200 240" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 226V82L100 14L186 82V226H128V148H72V226H14Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M100 14V82" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M14 82L100 82L186 82" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
      <path d="M72 148H128" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
    </svg>
  );
}
