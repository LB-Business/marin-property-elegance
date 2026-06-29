interface Props {
  className?: string;
  /** Main face color (front face of buildings). */
  color?: string;
  /** Color for top / depth faces (the lighter parallelograms). */
  accent?: string;
}

/**
 * Marin Propiedades isotype.
 * Two stacked 3D building forms in axonometric perspective:
 * a shorter building behind/left and a taller one in front/right.
 * Each building shows a front face (color) and a top face (accent).
 * Matches the official brandbook.
 */
export function IsotipoMark({
  className = "",
  color = "currentColor",
  accent = "currentColor",
}: Props) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Shorter (back/left) building */}
      {/* Top face — parallelogram, lighter */}
      <polygon points="22,92 48,68 102,68 76,92" fill={accent} opacity="0.55" />
      {/* Front face */}
      <polygon points="22,92 76,92 76,212 22,212" fill={color} />

      {/* Taller (front/right) building */}
      {/* Top face — parallelogram, lighter */}
      <polygon points="92,52 118,28 178,28 152,52" fill={accent} opacity="0.55" />
      {/* Front face */}
      <polygon points="92,52 152,52 152,212 92,212" fill={color} />
    </svg>
  );
}
