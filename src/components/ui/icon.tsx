
import { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof LucideIcons;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = LucideIcons[name];
  
  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in lucide-react`);
    return null;
  }
  
  return <LucideIcon {...props} />;
}
