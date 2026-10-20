import type { ReactNode, SVGProps } from 'react';

export type IconName = 'menu' | 'close' | 'search' | 'filter' | 'chevron-up' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'arrow-up' | 'arrow-left' | 'arrow-right' | 'copy' | 'check' | 'external-link' | 'refresh' | 'more';
export type IconProps = Omit<SVGProps<SVGSVGElement>, 'name' | 'children'> & {
  name: IconName;
  size?: number | string;
  title?: string;
};

const icons: Record<IconName, ReactNode> = {
  'menu': (
      <>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'close': (
      <>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'search': (
      <>
      <path d="M11 17.5C14.5899 17.5 17.5 14.5899 17.5 11C17.5 7.41015 14.5899 4.5 11 4.5C7.41015 4.5 4.5 7.41015 4.5 11C4.5 14.5899 7.41015 17.5 11 17.5Z" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </>
  ),
  'filter': (
      <>
      <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </>
  ),
  'chevron-up': (
      <>
      <path d="M6 15L12 9L18 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'chevron-down': (
      <>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'chevron-left': (
      <>
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'chevron-right': (
      <>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'arrow-up': (
      <>
      <path d="M12 20V4M18 10L12 4L6 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'arrow-left': (
      <>
      <path d="M20 12H4M10 18L4 12L10 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'arrow-right': (
      <>
      <path d="M4 12H20M14 18L20 12L14 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'copy': (
      <>
      <path d="M17 8H10C8.89543 8 8 8.89543 8 10V17C8 18.1046 8.89543 19 10 19H17C18.1046 19 19 18.1046 19 17V10C19 8.89543 18.1046 8 17 8Z" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'check': (
      <>
      <path d="M5 12.5L9.5 17L19 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'external-link': (
      <>
      <path d="M19 10V5H14M19 5L11 13M19 14V18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'refresh': (
      <>
      <path d="M20 10.9999C19.8708 9.36163 19.2402 7.80287 18.1939 6.53558C17.1476 5.2683 15.7364 4.35399 14.1522 3.91697C12.568 3.47994 10.8876 3.54141 9.33957 4.09301C7.79152 4.64462 6.4509 5.65959 5.5 6.99993L4 8.99993M9 8.99993H4V3.99993M4 12.9999C4.12921 14.6382 4.75983 16.197 5.80611 17.4643C6.8524 18.7316 8.26359 19.6459 9.8478 20.0829C11.432 20.5199 13.1124 20.4584 14.6604 19.9068C16.2085 19.3552 17.5491 18.3403 18.5 16.9999L20 14.9999M15 14.9999H20V19.9999" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </>
  ),
  'more': (
      <>
      <path d="M5 13.5C5.82843 13.5 6.5 12.8284 6.5 12C6.5 11.1716 5.82843 10.5 5 10.5C4.17157 10.5 3.5 11.1716 3.5 12C3.5 12.8284 4.17157 13.5 5 13.5Z" fill="currentColor"/>
      <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="currentColor"/>
      <path d="M19 13.5C19.8284 13.5 20.5 12.8284 20.5 12C20.5 11.1716 19.8284 10.5 19 10.5C18.1716 10.5 17.5 11.1716 17.5 12C17.5 12.8284 18.1716 13.5 19 13.5Z" fill="currentColor"/>
      </>
  )
};

export function Icon({ name, size = 24, title, width, height, 'aria-label': ariaLabel, ...props }: IconProps) {
  const accessibleName = ariaLabel ?? title;
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width ?? size}
      height={height ?? size}
      fill="none"
      role={accessibleName ? 'img' : undefined}
      aria-label={accessibleName}
      aria-hidden={accessibleName ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {icons[name]}
    </svg>
  );
}
