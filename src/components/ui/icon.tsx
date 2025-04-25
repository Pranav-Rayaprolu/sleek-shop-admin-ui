
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  // Convert kebab-case names like "file-text" to PascalCase "FileText"
  const formattedName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
  
  // Access the icon directly from the imported LucideIcons
  const IconComponent = LucideIcons[formattedName as keyof typeof LucideIcons];
  
  if (!IconComponent) {
    console.error(`Icon "${name}" (formatted as "${formattedName}") not found in lucide-react`);
    return null;
  }
  
  return <IconComponent {...props} />;
}
