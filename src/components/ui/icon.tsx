
import { LucideIcon, LucideProps } from "lucide-react";
import * as icons from "lucide-react";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof icons;
}

export function Icon({ name, ...props }: IconProps) {
  const Icon = icons[name] as LucideIcon;
  
  if (!Icon) {
    console.error(`Icon "${name}" not found in lucide-react`);
    return null;
  }
  
  return <Icon {...props} />;
}
