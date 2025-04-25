
import { LucideIcon, LucideProps } from "lucide-react";
import * as icons from "lucide-react";

// Convert kebab-case to PascalCase
const formatIconName = (name: string): string => {
  return name.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
};

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  // Convert kebab-case names like "file-text" to PascalCase "FileText"
  const formattedName = formatIconName(name);
  const IconComponent = icons[formattedName as keyof typeof icons] as LucideIcon;
  
  if (!IconComponent) {
    console.error(`Icon "${name}" (${formattedName}) not found in lucide-react`);
    return null;
  }
  
  return <IconComponent {...props} />;
}
