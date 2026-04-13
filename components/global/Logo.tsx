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
      src={variant === "dark" ? "/logos/logo-dark.png" : "/logos/logo-light.png"}
      alt="Milestone Fin Academy"
      width={width}
      height={width}
      className={className}
      priority
    />
  );
}
