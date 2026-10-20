declare module '*.svg?react' {
  import type { ComponentType, SVGProps } from 'react';
  const Icon: ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;
  export default Icon;
}
