
import { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons];
  
  if (!IconComponent) {
    // Fallback to a default icon or null
    return null;
  }
  
  return <IconComponent {...props} />;
}
