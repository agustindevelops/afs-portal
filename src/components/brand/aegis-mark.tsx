export function AegisMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 2.5 58 14.2v22.3c0 14.4-10.2 27.4-26 32.5C16.2 63.9 6 50.9 6 36.5V14.2L32 2.5Z"
        className="fill-brand-navy-900 stroke-brand-gold-200"
        strokeWidth="2.4"
      />
      <path
        d="M32 13.5 22 46h6.2l1.8-6.2h8l1.8 6.2H46L36 13.5h-4Zm.1 10.2 2.6 9.1h-5.2l2.6-9.1Z"
        className="fill-brand-gold-200"
      />
      <path
        d="M34.8 12.2 43 24.8l-4.6.4-6.2-8.6 2.6-4.4Z"
        className="fill-brand-gold-500"
      />
      <path
        d="M32 48c-5.4 0-9.8 2.4-11.4 6.2 3.6-1.1 7.4-1.7 11.4-1.7s7.8.6 11.4 1.7C41.8 50.4 37.4 48 32 48Z"
        className="fill-brand-teal-600"
      />
    </svg>
  );
}
