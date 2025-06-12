type TikTokIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export function TikTokIcon({ className, ...props }: TikTokIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
      aria-hidden="true"
    >
      <title>TikTok</title>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.05A6.34 6.34 0 003 15.69a6.34 6.34 0 0010.86 4.41 6.47 6.47 0 00.74-1.09 6.32 6.32 0 00.66-2.81V9.83a8.16 8.16 0 004.33 1.27V7.65a4.79 4.79 0 01-1.33-.14 4.83 4.83 0 001.33-1.23V6.69z" />
    </svg>
  );
} 