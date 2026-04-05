import Image from "next/image";

type LogoVariant = "dark" | "light";

export interface LogoProps {
  variant?: LogoVariant;
  width?: number;
  className?: string;
}

export function Logo({ variant = "light", width = 180, className = "" }: LogoProps) {
  return (
    <Image
      src={variant === "dark" ? "/logos/milestone-logo-dark.png" : "/logos/milestone-logo-light.png"}
      alt="Milestone Academy"
      width={width}
      height={Math.round(width * 0.22)}
      className={className}
      priority
    />
  );
}
