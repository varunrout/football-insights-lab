import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0-4.47 18.09" />
      <path d="M12 22a10 10 0 0 1 4.47-18.09" />
      <path d="M2 12h20" />
      <path d="M12 2a10 10 0 0 1 0 20" />
      <path d="M12 2a10 10 0 0 0 0 20" />
      <path d="M16.47 3.91a10 10 0 0 0-8.94 0" />
      <path d="M16.47 20.09a10 10 0 0 1-8.94 0" />
    </svg>
  );
}
