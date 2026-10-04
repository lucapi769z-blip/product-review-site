// Thin line icons. Decorative only: hidden from assistive tech.

const paths: Record<string, React.ReactNode> = {
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M10 9.2v5.6l4.6-2.8z" />
    </>
  ),
  article: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="0.5" />
      <path d="M8 7.5h8M8 10.5h8M8 13.5h8M8 16.5h5" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8h4l1.5-2h7L17 8h4v11H3z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10 5 7 4.5 3 5v13c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V5c-4-.5-7 0-9 1.5z" />
      <path d="M12 6.5v13" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="5.5" cy="10" r="2" />
      <circle cx="18.5" cy="10" r="2" />
      <path d="M2 19a3.5 3.5 0 0 1 4-3.4M22 19a3.5 3.5 0 0 0-4-3.4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 14h3v6H4zM10.5 10h3v10h-3zM17 5h3v15h-3z" />
    </>
  ),
  diamond: (
    <>
      <path d="M7 4h10l4 5-9 11L3 9z" />
      <path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" />
    </>
  ),
  handshake: (
    <>
      <path d="M2 9.5 5.5 6l3 1.5" />
      <path d="M22 9.5 18.5 6l-4 1.5h-3l-3.3 3.3a1.3 1.3 0 0 0 1.8 1.8L12 10.5l5.5 5" />
      <path d="M5.5 13 8 15.5M7.5 11.5l3.5 3.5M5.5 13 4 11.5M10 17l1 1a1.3 1.3 0 0 0 1.8-1.8M17.5 15.5l-1.7 1.7a1.3 1.3 0 0 1-1.8 0L12.6 16" />
    </>
  ),
  // Product categories (editorial Home)
  smartphone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
      <path d="M10.5 5h3" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  watch: (
    <>
      <circle cx="12" cy="12" r="5.5" />
      <path d="M9 7l.7-4.5h4.6L15 7M9 17l.7 4.5h4.6L15 17M12 9.5V12l1.5 1.5" />
    </>
  ),
  cup: (
    <>
      <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8.5 3.5c-.6.9.6 1.6 0 2.5M12 3.5c-.6.9.6 1.6 0 2.5" />
    </>
  ),
  laptop: (
    <>
      <rect x="4.5" y="5" width="15" height="10.5" rx="1" />
      <path d="M2 18.5h20" />
    </>
  ),
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="0.5" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </>
  ),
};

export function Icon({ name, className = "icon" }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
